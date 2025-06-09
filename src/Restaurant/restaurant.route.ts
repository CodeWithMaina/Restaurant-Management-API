import { Router } from "express";
import {
    createRestaurant,
    deleteRestaurant,
    getRestaurantById,
    getRestaurants,
    updateRestaurant
} from "./restaurant.controller"; // Ensure this path is correct for your restaurant controller

export const restaurantRouter = Router();

// Get all restaurants
restaurantRouter.get('/restaurant', getRestaurants);

// Get restaurant by ID
restaurantRouter.get('/restaurant/:id', getRestaurantById);

// Create a new restaurant
restaurantRouter.post('/restaurant', createRestaurant);

// Update an existing restaurant
restaurantRouter.put('/restaurant/:id', updateRestaurant);

// Delete an existing restaurant
restaurantRouter.delete('/restaurant/:id', deleteRestaurant);