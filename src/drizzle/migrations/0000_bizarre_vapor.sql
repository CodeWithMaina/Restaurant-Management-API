CREATE TYPE "public"."userType" AS ENUM('admin', 'driver', 'customer', 'restaurant_owner');--> statement-breakpoint
CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"streetAddress1" text NOT NULL,
	"streetAddress2" text,
	"zipCode" varchar(20),
	"deliveryInstructions" text,
	"userId" integer NOT NULL,
	"cityId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"stateId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"userId" integer NOT NULL,
	"commentText" text NOT NULL,
	"isComplaint" boolean DEFAULT false,
	"isPraise" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"carMake" varchar(100) NOT NULL,
	"carModel" varchar(100) NOT NULL,
	"carYear" integer NOT NULL,
	"userId" integer NOT NULL,
	"online" boolean DEFAULT false,
	"delivering" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "menuItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"restaurantId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"description" text,
	"ingredients" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"active" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orderMenuItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"menuItemId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"itemPrice" numeric(10, 2) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE "orderStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"statusCatalogId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurantId" integer NOT NULL,
	"estimatedDeliveryTime" timestamp,
	"actualDeliveryTime" timestamp NOT NULL,
	"deliveryAddressId" integer NOT NULL,
	"userId" integer NOT NULL,
	"driverId" integer,
	"price" numeric(10, 2) NOT NULL,
	"discount" numeric(10, 2) DEFAULT '0.00',
	"finalPrice" numeric(10, 2) NOT NULL,
	"comment" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"streetAddress" text,
	"zipCode" varchar(20),
	"cityId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "restaurantOwner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurantId" integer NOT NULL,
	"ownerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "statusCatalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"contactPhone" varchar(20) NOT NULL,
	"phoneVerified" boolean DEFAULT false,
	"email" varchar(255) NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"confirmationCode" varchar NOT NULL,
	"password" varchar(255) NOT NULL,
	"userType" "userType" DEFAULT 'customer',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_cityId_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_stateId_state_id_fk" FOREIGN KEY ("stateId") REFERENCES "public"."state"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "driver" ADD CONSTRAINT "driver_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menuItem" ADD CONSTRAINT "menuItem_restaurantId_restaurant_id_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menuItem" ADD CONSTRAINT "menuItem_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderMenuItem" ADD CONSTRAINT "orderMenuItem_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderMenuItem" ADD CONSTRAINT "orderMenuItem_menuItemId_menuItem_id_fk" FOREIGN KEY ("menuItemId") REFERENCES "public"."menuItem"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderStatus" ADD CONSTRAINT "orderStatus_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderStatus" ADD CONSTRAINT "orderStatus_statusCatalogId_statusCatalog_id_fk" FOREIGN KEY ("statusCatalogId") REFERENCES "public"."statusCatalog"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurantId_restaurant_id_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliveryAddressId_address_id_fk" FOREIGN KEY ("deliveryAddressId") REFERENCES "public"."address"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_driverId_driver_id_fk" FOREIGN KEY ("driverId") REFERENCES "public"."driver"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_cityId_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantOwner" ADD CONSTRAINT "restaurantOwner_restaurantId_restaurant_id_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurant"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantOwner" ADD CONSTRAINT "restaurantOwner_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;