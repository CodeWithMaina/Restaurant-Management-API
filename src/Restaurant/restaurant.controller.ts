import { Request, Response } from "express";
import {
  createNewRestaurantService,
  deleteRestaurantService,
  getRestaurantByIdService,
  getAllRestaurantsService,
  updateRestaurantService
} from "./restaurant.service";
import {
  RestaurantIdSchema,
  CreateRestaurantSchema,
  UpdateRestaurantSchema
} from "../validations/restaurant.validator";
import z from "zod";

// Get all restaurants
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const allRestaurants = await getAllRestaurantsService();
    if (!allRestaurants || allRestaurants.length === 0) {
      res.status(404).json({ message: "No Restaurants Found" });
      return;
    }
    res.status(200).json(allRestaurants);
  } catch (error) {
    console.error("Error in getRestaurants controller:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch restaurants" });
  }
};

// Get restaurant by id
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = RestaurantIdSchema.parse({ id: Number(req.params.id) });
    const foundRestaurant = await getRestaurantByIdService(id);
    
    if (!foundRestaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    
    res.status(200).json(foundRestaurant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch restaurant" });
    }
  }
};

// Create a new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const validatedData = CreateRestaurantSchema.parse(req.body);
    const newRestaurant = await createNewRestaurantService(validatedData);
    res.status(201).json({ message: newRestaurant });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error creating restaurant:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to create restaurant" });
    }
  }
};

// Update a restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const validatedData = UpdateRestaurantSchema.parse({ ...req.body, id });
    
    const updatedRestaurant = await updateRestaurantService(id, validatedData);
    res.status(200).json({ message: updatedRestaurant });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error updating restaurant:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update restaurant" });
    }
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = RestaurantIdSchema.parse({ id: Number(req.params.id) });
    const deleteMessage = await deleteRestaurantService(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error deleting restaurant:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete restaurant" });
    }
  }
};