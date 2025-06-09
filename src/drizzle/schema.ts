import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  decimal,
  pgEnum
} from "drizzle-orm/pg-core";
import {
  relations,
} from "drizzle-orm"

export const roleEnum = pgEnum("userType",['admin','driver','customer','restaurant_owner'])

// USERS
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255 }).notNull(),
    contactPhone: varchar("contactPhone", { length: 20 }).notNull(),
    phoneVerified: boolean("phoneVerified").default(false),
    email: varchar("email", {length: 255 }).unique().notNull(),
    emailVerified: boolean("emailVerified").default(false),
    confirmationCode: varchar("confirmationCode"),
    password: varchar("password", {length: 255 }).notNull(),
    userType: roleEnum("userType").default('customer'),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// ADDRESS
export const address = pgTable("address", {
    id: serial("id").primaryKey(),
    streetAddress1: text("streetAddress1").notNull(),
    streetAddress2: text("streetAddress2"),
    zipCode: varchar("zipCode", { length: 20 }),
    deliveryInstructions: text("deliveryInstructions"),
    userId: integer("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
    cityId: integer("cityId").references(() => city.id, { onDelete: "cascade"}).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// STATE
export const state = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length: 10 }).notNull(),
});

// CITY
export const city = pgTable("city", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    stateId: integer("stateId").references(() => state.id, { onDelete: "cascade" }).notNull(),
});

// CATEGORY
export const category = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
});

// RESTAURANT
export const restaurant = pgTable("restaurant", {
    id: serial("id").primaryKey(),
    name: varchar("name",{ length: 255 }).notNull(),
    streetAddress: text("streetAddress"),
    zipCode: varchar("zipCode", { length: 20 }),
    cityId: integer("cityId").references(() => city.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// RESTAURANT OWNER
export const restaurantOwner = pgTable("restaurantOwner", {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurantId").references(() => restaurant.id, { onDelete: "cascade" }).notNull(),
    ownerId: integer("ownerId").references(() => users.id, { onDelete: "cascade" }).notNull(),
});

// DRIVER
export const driver = pgTable("driver", {
    id: serial("id").primaryKey(),
    carMake: varchar("carMake", { length: 100 }).notNull(),
    carModel: varchar("carModel", { length: 100 }).notNull(),
    carYear: integer("carYear").notNull(),
    userId: integer("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
    online: boolean("online").default(false),
    delivering: boolean("delivering").default(false),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// MENU ITEM
export const menuItem = pgTable("menuItem", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    restaurantId: integer("restaurantId").references(() => restaurant.id, { onDelete: "cascade" }).notNull(),
    categoryId: integer("categoryId").references(() => category.id, { onDelete: "cascade" }).notNull(),
    description: text("description"),
    ingredients: text("ingredients").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    active: boolean("active").default(true),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// ORDER
export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurantId").references(() => restaurant.id, { onDelete: "cascade" }).notNull(),
    estimatedDeliveryTime: timestamp("estimatedDeliveryTime"),
    actualDeliveryTime: timestamp("actualDeliveryTime").notNull(),
    deliveryAddressId: integer("deliveryAddressId").references(() => address.id, { onDelete: "restrict" }).notNull(),
    userId: integer("userId").references(() => users.id, { onDelete: "cascade" }).notNull(),
    driverId: integer("driverId").references(() => driver.id, { onDelete: "set null" }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    discount: decimal("discount", { precision: 10, scale: 2 }).default('0.00'),
    finalPrice: decimal("finalPrice", { precision: 10, scale: 2 }).notNull(),
    comment: text("comment"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// ORDER MENU ITEM
export const orderMenuItem = pgTable("orderMenuItem", {
    id: serial("id").primaryKey(),
    orderId: integer("orderId").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    menuItemId: integer("menuItemId").references(() => menuItem.id, { onDelete: "restrict" }).notNull(),
    quantity: integer("quantity").notNull(),
    itemPrice: decimal("itemPrice", { precision: 10, scale: 2 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    comment: text("comment"),
});

// COMMENT
export const comment = pgTable("comment", {
    id: serial("id").primaryKey(),
    orderId: integer("orderId").references(() => orders.id).notNull(),
    userId: integer("userId").references(() => users.id,).notNull(),
    commentText: text("commentText").notNull(),
    isComplaint: boolean("isComplaint").default(false),
    isPraise: boolean("isPraise").default(false),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// STATUS CATALOG
export const statusCatalog = pgTable("statusCatalog", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
});

// ORDER STATUS
export const orderStatus = pgTable("orderStatus", {
    id: serial("id").primaryKey(),
    orderId: integer("orderId").references(() => orders.id, {onDelete: "cascade"}).notNull(),
    statusCatalogId: integer("statusCatalogId").references(() => statusCatalog.id, {onDelete: "cascade"}).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
});



// Relations

// USERS
export const usersRelations = relations(users, ({ many, one }) => ({
    addresses: many(address),
    comments: many(comment),
    driver: one(driver),
    orders: many(orders),
    ownedRestaurants: many(restaurantOwner),
}));


// ADDRESS
export const addressRelations = relations(address, ({ one, many }) => ({
  user: one(users, { fields: [address.userId], references: [users.id] }),
  city: one(city, { fields: [address.cityId], references: [city.id] }),
  orders: many(orders),
}));


// STATE
export const stateRelations = relations(state, ({ many }) => ({
    cities: many(city),
}));

// CITY
export const cityRelations = relations(city, ({ one, many }) => ({
    state: one(state, { fields: [city.stateId], references: [state.id] }),
    addresses: many(address),
    restaurants: many(restaurant),
}));

// CATEGORY
export const categoryRelations = relations(category, ({ many }) => ({
    menuItems: many(menuItem),
}));

// RESTAURANT
export const restaurantRelations = relations(restaurant, ({ many, one }) => ({
    city: one(city, { fields: [restaurant.cityId], references: [city.id] }),
    menuItems: many(menuItem),
    orders: many(orders),
    owners: many(restaurantOwner),
}));

// RESTAURANT OWNER
export const restaurantOwnerRelations = relations(restaurantOwner, ({ one }) => ({
    restaurant: one(restaurant, { fields: [restaurantOwner.restaurantId], references: [restaurant.id] }),
    user: one(users, { fields: [restaurantOwner.ownerId], references: [users.id] }),
}));

// DRIVER
export const driverRelations = relations(driver, ({ one, many }) => ({
    user: one(users, { fields: [driver.userId], references: [users.id] }),
    orders: many(orders),
}));

// MENU ITEM
export const menuItemRelations = relations(menuItem, ({ one, many }) => ({
    restaurant: one(restaurant, { fields: [menuItem.restaurantId], references: [restaurant.id] }),
    category: one(category, { fields: [menuItem.categoryId], references: [category.id] }),
    orderItems: many(orderMenuItem),
}));

// ORDERS
export const ordersRelations = relations(orders, ({ one, many }) => ({
    restaurant: one(restaurant, { fields: [orders.restaurantId], references: [restaurant.id] }),
    deliveryAddress: one(address, { fields: [orders.deliveryAddressId], references: [address.id] }),
    user: one(users, { fields: [orders.userId], references: [users.id] }),
    driver: one(driver, { fields: [orders.driverId], references: [driver.id] }),
    comments: many(comment),
    orderItems: many(orderMenuItem),
    statuses: many(orderStatus),
}));

// ORDER MENU ITEM
export const orderMenuItemRelations = relations(orderMenuItem, ({ one }) => ({
    order: one(orders, { fields: [orderMenuItem.orderId], references: [orders.id] }),
    menuItem: one(menuItem, { fields: [orderMenuItem.menuItemId], references: [menuItem.id] }),
}));

// COMMENT
export const commentRelations = relations(comment, ({ one }) => ({
    order: one(orders, { fields: [comment.orderId], references: [orders.id] }),
    user: one(users, { fields: [comment.userId], references: [users.id] }),
}));

// STATUS CATALOG
export const statusCatalogRelations = relations(statusCatalog, ({ many }) => ({
    orderStatuses: many(orderStatus),
}));

// ORDER STATUS
export const orderStatusRelations = relations(orderStatus, ({ one }) => ({
    order: one(orders, { fields: [orderStatus.orderId], references: [orders.id] }),
    statusCatalog: one(statusCatalog, { fields: [orderStatus.statusCatalogId], references: [statusCatalog.id] }),
}));


export type TUsersInsert = typeof users.$inferInsert;
export type TUsersSelect = typeof users.$inferSelect;

export type TAddressInsert = typeof address.$inferInsert;
export type TAddressSelect = typeof address.$inferSelect;

export type TStateInsert = typeof state.$inferInsert;
export type TStateSelect = typeof state.$inferSelect;

export type TCityInsert = typeof city.$inferInsert;
export type TCitySelect = typeof city.$inferSelect;

export type TCategoryInsert = typeof category.$inferInsert;
export type TCategorySelect = typeof category.$inferSelect;

export type TRestaurantInsert = typeof restaurant.$inferInsert;
export type TRestaurantSelect = typeof restaurant.$inferSelect;

export type TRestaurantOwnerInsert = typeof restaurantOwner.$inferInsert;
export type TRestaurantOwnerSelect = typeof restaurantOwner.$inferSelect;

export type TDriverInsert = typeof driver.$inferInsert;
export type TDriverSelect = typeof driver.$inferSelect;

export type TMenuItemInsert = typeof menuItem.$inferInsert;
export type TMenuItemSelect = typeof menuItem.$inferSelect;

export type TOrdersInsert = typeof orders.$inferInsert;
export type TOrdersSelect = typeof orders.$inferSelect;

export type TOrderMenuItemInsert = typeof orderMenuItem.$inferInsert;
export type TOrderMenuItemSelect = typeof orderMenuItem.$inferSelect;

export type TCommentInsert = typeof comment.$inferInsert;
export type TCommentSelect = typeof comment.$inferSelect;

export type TStatusCatalogInsert = typeof statusCatalog.$inferInsert;
export type TStatusCatalogSelect = typeof statusCatalog.$inferSelect;

export type TOrderStatusInsert = typeof orderStatus.$inferInsert;
export type TOrderStatusSelect = typeof orderStatus.$inferSelect;