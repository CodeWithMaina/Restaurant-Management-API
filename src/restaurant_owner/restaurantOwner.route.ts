import { Router } from "express";
import { getRestaurantOwners, getRestaurantOwnerById, createRestaurantOwner, updateRestaurantOwner, deleteRestaurantOwner } from "./restaurantOwner.controller";
export const restaurantOwnerRouter = Router();
restaurantOwnerRouter.get("/restaurant-owners", getRestaurantOwners);
restaurantOwnerRouter.get("/restaurant-owners/:id", getRestaurantOwnerById);
restaurantOwnerRouter.post("/restaurant-owners/", createRestaurantOwner);
restaurantOwnerRouter.put("/restaurant-owners/:id", updateRestaurantOwner);
restaurantOwnerRouter.delete("/restaurant-owners/:id", deleteRestaurantOwner);