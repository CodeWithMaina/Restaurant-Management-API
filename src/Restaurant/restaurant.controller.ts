import { restaurant } from './../drizzle/schema';
import { Request, Response } from "express";
import {
    createNewRestaurantService,
    deleteRestaurantService,
    getRestaurantByIdService,
    getAllRestaurantsService,
    updateRestaurantService
} from "./restaurant.service";

// Get all restaurants
export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const allRestaurants = await getAllRestaurantsService();
        if (allRestaurants === null || allRestaurants.length === 0) {
            res.status(404).json({ message: "No Restaurants Found" });
        } else {
          res.status(200).json(allRestaurants);
        }
    } catch (error: any) {
        console.error("Error in getRestaurants controller:", error);
         res.status(500).json({ error: error.message || "Failed to fetch restaurants" });
    }
};

// Get restaurant by id
export const getRestaurantById = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);

    if (isNaN(restaurantId)) {
        res.status(400).json({ error: "Invalid restaurant ID" });
    }

    try {
        const foundRestaurant = await getRestaurantByIdService(restaurantId);
        if (foundRestaurant === null || foundRestaurant === undefined) {
             res.status(404).json({ message: "Restaurant not found" });
        } else {
            res.status(200).json(foundRestaurant);
        }
    } catch (error: any) {
        console.error(`Error in getRestaurantById controller for ID ${restaurantId}:`, error);
        res.status(500).json({ error: error.message || "Failed to fetch restaurant" });
    }
};

// Create a new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = req.body;

    if (isNaN(restaurantId)) {
        res.status(400).json({ error: "RestaurantID must be a valid number" });
        return;
    }

    try {
        const newRestaurant = await createNewRestaurantService(restaurant);
        if (newRestaurant === null) {
             res.status(500).json({ message: "Failed to create restaurant" });
        } else {
             res.status(201).json({ message:newRestaurant });
        }
    } catch (error: any) {
        console.error("Error in createRestaurant controller:", error);
         res.status(500).json({ error: error.message || "Failed to create restaurant" });
    }
};

// Update a restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);
    
    if (isNaN(restaurantId)) {
        res.status(400).json({ error: "Invalid restaurant ID" });
    }

    const restaurant = req.body;
    try {
         const updatedRestaurant = await updateRestaurantService(restaurantId, restaurant);
            if (updatedRestaurant == null) {
                res.status(404).json({ message: "Restaurant not found or failed to update" });
            } else {
                res.status(200).json({ message: updatedRestaurant });
            }
        
    } catch (error:any) {
         res.status(500).json({ error: error.message || "Failed to update city" });
    }
};

// Delete a restaurant
export const deleteRestaurant = async (req: Request, res: Response) => {
    const restaurantId = parseInt(req.params.id);

    if (isNaN(restaurantId)) {
         res.status(400).json({ error: "Invalid restaurant ID" });
    }

    try {
        const deletedConfirmation = await deleteRestaurantService(restaurantId);

        if (deletedConfirmation === "Restaurant deleted successfully 🎉") {
            res.status(200).json({ message: `Restaurant with ID ${restaurantId} deleted successfully` });
        } else {
             res.status(404).json({ message: "Restaurant not found or could not be deleted" });
        }
    } catch (error: any) {
        console.error(`Error in deleteRestaurant controller for ID ${restaurantId}:`, error);
         res.status(500).json({ error: error.message || "Failed to delete restaurant" });
    }
};