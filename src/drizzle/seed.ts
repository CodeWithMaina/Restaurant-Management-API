import db from "./db";
import {
  state,
  city,
  users,
  address,
  restaurant,
  restaurantOwner,
  category,
  driver,
  menuItem,
  orders,
  orderMenuItem,
  comment,
  statusCatalog,
  orderStatus,
} from "./schema";

async function seed() {
  console.log("✅ Seeding started...");

  // Clear all tables in reverse order of dependencies
  console.log("🧹 Clearing tables...");
  await db.delete(orderStatus).execute();
  await db.delete(comment).execute();
  await db.delete(orderMenuItem).execute();
  await db.delete(orders).execute();
  await db.delete(menuItem).execute();
  await db.delete(driver).execute();
  await db.delete(restaurantOwner).execute();
  await db.delete(restaurant).execute();
  await db.delete(category).execute();
  await db.delete(address).execute();
  await db.delete(users).execute();
  await db.delete(city).execute();
  await db.delete(state).execute();
  await db.delete(statusCatalog).execute();

  console.log("🌱 Seeding data...");

  // 1. State - 5 entries
  const stateIds = await db.insert(state).values([
    { name: "California", code: "CA" },
    { name: "New York", code: "NY" },
    { name: "Texas", code: "TX" },
    { name: "Florida", code: "FL" },
    { name: "Illinois", code: "IL" },
  ]).returning({ id: state.id });

  // 2. City - 5 entries
  const cityIds = await db.insert(city).values([
    { name: "Los Angeles", stateId: stateIds[0].id },
    { name: "New York City", stateId: stateIds[1].id },
    { name: "Austin", stateId: stateIds[2].id },
    { name: "Miami", stateId: stateIds[3].id },
    { name: "Chicago", stateId: stateIds[4].id },
  ]).returning({ id: city.id });

  // 3. Users - 5 entries (one of each role)
  const userIds = await db.insert(users).values([
    {
      name: "Admin User",
      contactPhone: "1111111111",
      phoneVerified: true,
      email: "admin@example.com",
      emailVerified: true,
      confirmationCode: "ADM123",
      password: "hashed-password-1",
      userType: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Restaurant Owner",
      contactPhone: "2222222222",
      phoneVerified: true,
      email: "owner@example.com",
      emailVerified: true,
      confirmationCode: "OWN111",
      password: "hashed-password-2",
      userType: "restaurant_owner",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Driver User",
      contactPhone: "3333333333",
      phoneVerified: true,
      email: "driver@example.com",
      emailVerified: true,
      confirmationCode: "DRV111",
      password: "hashed-password-3",
      userType: "driver",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Customer 1",
      contactPhone: "4444444444",
      phoneVerified: true,
      email: "customer1@example.com",
      emailVerified: true,
      confirmationCode: "CUS111",
      password: "hashed-password-4",
      userType: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Customer 2",
      contactPhone: "5555555555",
      phoneVerified: false,
      email: "customer2@example.com",
      emailVerified: false,
      confirmationCode: "CUS222",
      password: "hashed-password-5",
      userType: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]).returning({ id: users.id });

  // 4. Address - 5 entries (one per user)
  const addressIds = await db.insert(address).values([
    {
      streetAddress1: "123 Admin St",
      zipCode: "90001",
      deliveryInstructions: "Front desk",
      userId: userIds[0].id,
      cityId: cityIds[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      streetAddress1: "456 Owner Lane",
      zipCode: "10001",
      deliveryInstructions: "Ring bell",
      userId: userIds[1].id,
      cityId: cityIds[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      streetAddress1: "789 Driver Rd",
      zipCode: "73301",
      deliveryInstructions: "Leave with neighbor",
      userId: userIds[2].id,
      cityId: cityIds[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      streetAddress1: "101 Customer Ave",
      zipCode: "33101",
      deliveryInstructions: "Do not ring",
      userId: userIds[3].id,
      cityId: cityIds[3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      streetAddress1: "202 Customer Blvd",
      zipCode: "60601",
      deliveryInstructions: "Leave at door",
      userId: userIds[4].id,
      cityId: cityIds[4].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]).returning({ id: address.id });

  // 5. Restaurant - 5 entries
  const restaurantIds = await db.insert(restaurant).values([
    {
      name: "The Gourmet Kitchen",
      streetAddress: "100 Foodie Lane",
      zipCode: "90001",
      cityId: cityIds[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Big Apple Bistro",
      streetAddress: "300 Broadway",
      zipCode: "10001",
      cityId: cityIds[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Texas BBQ Pit",
      streetAddress: "400 Smokehouse Rd",
      zipCode: "73301",
      cityId: cityIds[2].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Miami Grill",
      streetAddress: "500 Beach Ave",
      zipCode: "33101",
      cityId: cityIds[3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Chicago Deep Dish",
      streetAddress: "600 Pizza Street",
      zipCode: "60601",
      cityId: cityIds[4].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]).returning({ id: restaurant.id });

  // 6. Restaurant Owner - 5 entries (one owner owns all restaurants)
  await db.insert(restaurantOwner).values([
    {
      restaurantId: restaurantIds[0].id,
      ownerId: userIds[1].id,
    },
    {
      restaurantId: restaurantIds[1].id,
      ownerId: userIds[1].id,
    },
    {
      restaurantId: restaurantIds[2].id,
      ownerId: userIds[1].id,
    },
    {
      restaurantId: restaurantIds[3].id,
      ownerId: userIds[1].id,
    },
    {
      restaurantId: restaurantIds[4].id,
      ownerId: userIds[1].id,
    },
  ]);

  // 7. Category - 5 entries
  const categoryIds = await db.insert(category).values([
    { name: "Appetizers" },
    { name: "Entrees" },
    { name: "Desserts" },
    { name: "Beverages" },
    { name: "Specials" },
  ]).returning({ id: category.id });

  // 8. Driver - 5 entries (all for the same driver user)
  const driverIds = await db.insert(driver).values([
    {
      carMake: "Toyota",
      carModel: "Camry",
      carYear: 2020,
      userId: userIds[2].id,
      online: true,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      carMake: "Honda",
      carModel: "Civic",
      carYear: 2019,
      userId: userIds[2].id,
      online: true,
      delivering: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      carMake: "Ford",
      carModel: "Focus",
      carYear: 2021,
      userId: userIds[2].id,
      online: false,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      carMake: "Chevy",
      carModel: "Malibu",
      carYear: 2018,
      userId: userIds[2].id,
      online: true,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      carMake: "Nissan",
      carModel: "Altima",
      carYear: 2020,
      userId: userIds[2].id,
      online: false,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]).returning({ id: driver.id });

  // 9. Menu Item - 5 entries per restaurant (25 total)
  const menuItems = [];
  for (let restaurantIdx = 0; restaurantIdx < restaurantIds.length; restaurantIdx++) {
    for (let i = 1; i <= 5; i++) {
      const categoryIdx = ((i - 1) % 5); // Cycle through categories
      menuItems.push({
        name: `Menu Item ${i} for Restaurant ${restaurantIdx + 1}`,
        restaurantId: restaurantIds[restaurantIdx].id,
        categoryId: categoryIds[categoryIdx].id,
        description: `Delicious item ${i} from restaurant ${restaurantIdx + 1}`,
        ingredients: "Various ingredients",
        price: (10 + i).toFixed(2),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  const menuItemIds = await db.insert(menuItem).values(menuItems).returning({ id: menuItem.id });

  // 10. Status Catalog - 5 entries
  const statusCatalogIds = await db.insert(statusCatalog).values([
    { name: "Placed" },
    { name: "Prepared" },
    { name: "Out for delivery" },
    { name: "Delivered" },
    { name: "Cancelled" },
  ]).returning({ id: statusCatalog.id });

  // 11. Orders - 5 entries
  const now = new Date();
  const ordersData = [];
  for (let i = 0; i < 5; i++) {
    const restaurantIdx = i % 5;
    const userIdx = i % 5;
    const driverIdx = i % 5;
    const addressIdx = i % 5;
    
    ordersData.push({
      restaurantId: restaurantIds[restaurantIdx].id,
      estimatedDeliveryTime: new Date(now.getTime() + (30 + (i + 1) * 5) * 60000),
      actualDeliveryTime: new Date(now.getTime() + (35 + (i + 1) * 5) * 60000),
      deliveryAddressId: addressIds[addressIdx].id,
      userId: userIds[userIdx].id,
      driverId: driverIds[driverIdx].id,
      price: (20 + (i + 1) * 3).toFixed(2),
      discount: ((i + 1) % 3 === 0 ? (i + 1) : 0).toFixed(2),
      finalPrice: (20 + (i + 1) * 3 - ((i + 1) % 3 === 0 ? (i + 1) : 0)).toFixed(2),
      comment: (i + 1) % 2 === 0 ? `Special instructions for order ${i + 1}` : null,
      createdAt: new Date(now.getTime() - (i + 1) * 3600000),
      updatedAt: new Date(now.getTime() - (i + 1) * 3600000),
    });
  }
  const orderIds = await db.insert(orders).values(ordersData).returning({ id: orders.id });

  // 12. Order Menu Item - 5 entries (1-2 items per order)
  const orderMenuItems = [];
  for (let orderIdx = 0; orderIdx < orderIds.length; orderIdx++) {
    const itemsInOrder = ((orderIdx + 1) % 2) + 1; // 1-2 items per order
    for (let j = 1; j <= itemsInOrder; j++) {
      const menuItemIdx = ((orderIdx) * 2 + j) % menuItemIds.length;
      const quantity = (j % 2) + 1; // 1 or 2 quantity
      const itemPrice = (10 + ((orderIdx + 1 + j) % 10)).toFixed(2);
      
      orderMenuItems.push({
        orderId: orderIds[orderIdx].id,
        menuItemId: menuItemIds[menuItemIdx].id,
        quantity,
        itemPrice,
        price: (parseFloat(itemPrice) * quantity).toFixed(2),
        comment: j % 2 === 0 ? `Special request for item ${j}` : null,
      });
    }
  }
  await db.insert(orderMenuItem).values(orderMenuItems);

  // 13. Order Status - 5 entries (1-2 statuses per order)
  const orderStatuses = [];
  for (let orderIdx = 0; orderIdx < orderIds.length; orderIdx++) {
    const statusUpdates = ((orderIdx + 1) % 2) + 1;
    for (let k = 1; k <= statusUpdates; k++) {
      const statusCatalogIdx = k > 4 ? 3 : k - 1;
      orderStatuses.push({
        orderId: orderIds[orderIdx].id,
        statusCatalogId: statusCatalogIds[statusCatalogIdx].id,
        createdAt: new Date(now.getTime() - ((orderIdx + 1) * 3600000) + (k * 900000)),
      });
    }
  }
  await db.insert(orderStatus).values(orderStatuses);

  // 14. Comment - 5 entries (mix of praise and complaints)
  await db.insert(comment).values([
    {
      orderId: orderIds[0].id,
      userId: userIds[0].id,
      commentText: "Excellent service!",
      isComplaint: false,
      isPraise: true,
      createdAt: new Date(now.getTime() - 5000000),
      updatedAt: new Date(now.getTime() - 5000000),
    },
    {
      orderId: orderIds[1].id,
      userId: userIds[1].id,
      commentText: "Food was cold when it arrived",
      isComplaint: true,
      isPraise: false,
      createdAt: new Date(now.getTime() - 4000000),
      updatedAt: new Date(now.getTime() - 4000000),
    },
    {
      orderId: orderIds[2].id,
      userId: userIds[2].id,
      commentText: "Driver was very polite",
      isComplaint: false,
      isPraise: true,
      createdAt: new Date(now.getTime() - 3000000),
      updatedAt: new Date(now.getTime() - 3000000),
    },
    {
      orderId: orderIds[3].id,
      userId: userIds[3].id,
      commentText: "Missing items from my order",
      isComplaint: true,
      isPraise: false,
      createdAt: new Date(now.getTime() - 2000000),
      updatedAt: new Date(now.getTime() - 2000000),
    },
    {
      orderId: orderIds[4].id,
      userId: userIds[4].id,
      commentText: "Perfect delivery time!",
      isComplaint: false,
      isPraise: true,
      createdAt: new Date(now.getTime() - 1000000),
      updatedAt: new Date(now.getTime() - 1000000),
    },
  ]);

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});