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

  // 1. State
  await db.insert(state).values([
    { id: 1, name: "California", code: "CA" },
    { id: 2, name: "New York", code: "NY" },
    { id: 3, name: "Texas", code: "TX" },
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
      userType: "customer",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Charlie Brown",
      contactPhone: "5551234567",
      phoneVerified: true,
      email: "charlie@example.com",
      emailVerified: true,
      confirmationCode: "DEF789",
      password: "hashed-password-3",
      userType: "driver",
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
    {
      id: 2,
      streetAddress1: "456 Oak Ave",
      zipCode: "94102",
      deliveryInstructions: "Ring bell twice",
      userId: 2,
      cityId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      streetAddress1: "789 Pine Rd",
      streetAddress2: "Unit 12",
      zipCode: "10001",
      deliveryInstructions: "Call upon arrival",
      userId: 3,
      cityId: 3,
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
    {
      id: 2,
      name: "Burger Palace",
      streetAddress: "789 Maple Blvd",
      zipCode: "90001",
      cityId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Pizza Heaven",
      streetAddress: "101 Pizza Lane",
      zipCode: "10001",
      cityId: 3,
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
    {
      id: 2,
      restaurantId: 2,
      ownerId: 2,
    },
    {
      id: 3,
      restaurantId: 3,
      ownerId: 3,
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
      userId: 3,
      online: true,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      carMake: "Honda",
      carModel: "Civic",
      carYear: 2019,
      userId: 2,
      online: false,
      delivering: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      carMake: "Ford",
      carModel: "Focus",
      carYear: 2021,
      userId: 1,
      online: true,
      delivering: true,
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
    {
      id: 2,
      name: "Cheeseburger",
      restaurantId: 2,
      categoryId: 2,
      description: "Classic American cheeseburger",
      ingredients: "beef patty, cheese, bun",
      price: "12.99",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Pepperoni Pizza",
      restaurantId: 3,
      categoryId: 2,
      description: "Large pepperoni pizza",
      ingredients: "dough, sauce, cheese, pepperoni",
      price: "18.99",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 10. Status Catalog
  await db.insert(statusCatalog).values([
    { id: 1, name: "Placed" },
    { id: 2, name: "Prepared" },
    { id: 3, name: "Out for delivery" },
    { id: 4, name: "Delivered" },
    { id: 5, name: "Cancelled" },
  ]);

  // 11. Orders
  const now = new Date();
  await db.insert(orders).values([
    {
      id: 1,
      restaurantId: 1,
      estimatedDeliveryTime: new Date(now.getTime() + 30 * 60000),
      actualDeliveryTime: new Date(now.getTime() + 35 * 60000),
      deliveryAddressId: 1,
      userId: 1,
      driverId: 1,
      price: "29.97",
      discount: "3.00",
      finalPrice: "26.97",
      comment: "Please hurry!",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 2,
      restaurantId: 2,
      estimatedDeliveryTime: new Date(now.getTime() + 45 * 60000),
      actualDeliveryTime: new Date(now.getTime() + 50 * 60000),
      deliveryAddressId: 2,
      userId: 2,
      driverId: 2,
      price: "25.98",
      discount: "0.00",
      finalPrice: "25.98",
      comment: "Extra ketchup please",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 3,
      restaurantId: 3,
      estimatedDeliveryTime: new Date(now.getTime() + 60 * 60000),
      actualDeliveryTime: new Date(now.getTime() + 65 * 60000),
      deliveryAddressId: 3,
      userId: 3,
      driverId: 3,
      price: "37.98",
      discount: "5.00",
      finalPrice: "32.98",
      comment: "Cut into 8 slices",
      createdAt: now,
      updatedAt: now,
    },
  ]);

  // 12. Order Menu Item
  await db.insert(orderMenuItem).values([
    {
      id: 1,
      orderId: 1,
      menuItemId: 1,
      quantity: 3,
      itemPrice: "9.99",
      price: "29.97",
      comment: "Extra dressing",
    },
    {
      id: 2,
      orderId: 2,
      menuItemId: 2,
      quantity: 2,
      itemPrice: "12.99",
      price: "25.98",
      comment: "No onions",
    },
    {
      id: 3,
      orderId: 3,
      menuItemId: 3,
      quantity: 2,
      itemPrice: "18.99",
      price: "37.98",
      comment: "Well done",
    },
  ]);

  // 13. Order Status
  await db.insert(orderStatus).values([
    {
      id: 1,
      orderId: 1,
      statusCatalogId: 4,
      createdAt: now,
    },
    {
      id: 2,
      orderId: 2,
      statusCatalogId: 3,
      createdAt: now,
    },
    {
      id: 3,
      orderId: 3,
      statusCatalogId: 2,
      createdAt: now,
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
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 2,
      orderId: 2,
      userId: 2,
      commentText: "Food was cold",
      isComplaint: true,
      isPraise: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 3,
      orderId: 3,
      userId: 3,
      commentText: "Perfect delivery time",
      isComplaint: false,
      isPraise: true,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});