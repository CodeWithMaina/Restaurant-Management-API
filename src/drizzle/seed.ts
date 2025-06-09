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

  // 1. State
  await db.insert(state).values([
    { id: 1, name: "California", code: "CA" },
    { id: 2, name: "New York", code: "NY" },
  ]);

  // 2. City
  await db.insert(city).values([
    { id: 1, name: "Los Angeles", stateId: 1 },
    { id: 2, name: "San Francisco", stateId: 1 },
    { id: 3, name: "New York City", stateId: 2 },
  ]);

  // 3. Users
  await db.insert(users).values([
    {
      id: 1,
      name: "Alice Johnson",
      contactPhone: "1234567890",
      phoneVerified: true,
      email: "alice@example.com",
      emailVerified: true,
      confirmationCode: "ABC123",
      password: "hashed-password-1",
      userType: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Bob Smith",
      contactPhone: "0987654321",
      phoneVerified: false,
      email: "bob@example.com",
      emailVerified: false,
      confirmationCode: "XYZ456",
      password: "hashed-password-2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 4. Address
  await db.insert(address).values([
    {
      id: 1,
      streetAddress1: "123 Main St",
      streetAddress2: "Apt 4B",
      zipCode: "90001",
      deliveryInstructions: "Leave at door",
      userId: 1,
      cityId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 5. Restaurant
  await db.insert(restaurant).values([
    {
      id: 1,
      name: "The Tasty Fork",
      streetAddress: "456 Elm St",
      zipCode: "94102",
      cityId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 6. Restaurant Owner
  await db.insert(restaurantOwner).values([
    {
      id: 1,
      restaurantId: 1,
      ownerId: 1,
    },
  ]);

  // 7. Category
  await db.insert(category).values([
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Entrees" },
    { id: 3, name: "Desserts" },
  ]);

  // 8. Driver
  await db.insert(driver).values([
    {
      id: 1,
      carMake: "Toyota",
      carModel: "Camry",
      carYear: 2020,
      userId: 2,
      online: true,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 9. Menu Item
  await db.insert(menuItem).values([
    {
      id: 1,
      name: "Caesar Salad",
      restaurantId: 1,
      categoryId: 1,
      description: "Fresh romaine with Caesar dressing",
      ingredients: "lettuce, croutons, cheese",
      price: "9.99",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 10. Orders
  await db.insert(orders).values([
    {
      id: 1,
      restaurantId: 1,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000),
      actualDeliveryTime: new Date(Date.now() + 35 * 60000),
      deliveryAddressId: 1,
      userId: 1,
      driverId: 1,
      price: "9.99",
      discount: "1.00",
      finalPrice: "8.99",
      comment: "Please hurry!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 11. Order Menu Item
  await db.insert(orderMenuItem).values([
    {
      id: 1,
      orderId: 1,
      menuItemId: 1,
      quantity: 1,
      itemPrice: "9.99",
      price: "9.99",
      comment: "Extra dressing",
    },
  ]);

  // 12. Status Catalog
  await db.insert(statusCatalog).values([
    { id: 1, name: "Placed" },
    { id: 2, name: "Prepared" },
    { id: 3, name: "Out for delivery" },
    { id: 4, name: "Delivered" },
  ]);

  // 13. Order Status
  await db.insert(orderStatus).values([
    {
      id: 1,
      orderId: 1,
      statusCatalogId: 1,
      createdAt: new Date(),
    },
  ]);

  // 14. Comment
  await db.insert(comment).values([
    {
      id: 1,
      orderId: 1,
      userId: 1,
      commentText: "Great service!",
      isComplaint: false,
      isPraise: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});