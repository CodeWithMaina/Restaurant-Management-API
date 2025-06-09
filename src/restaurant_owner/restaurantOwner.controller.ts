 import { Request, Response } from "express";
import {
    getRestaurantOwnersService,
    getRestaurantOwnerByIdService,
    createRestaurantOwnerService,
    updateRestaurantOwnerService,
    deleteRestaurantOwnerService
} from "./restaurantOwner.service";

export const getRestaurantOwners = async (req: Request, res: Response) => {
    try {
        const restaurantOwners = await getRestaurantOwnersService();
        if (!restaurantOwners || restaurantOwners.length === 0) {
            res.status(404).json({ message: "No restaurant owners found" });
            return;
        }
        res.status(200).json(restaurantOwners);
    } catch (error) {
        console.error("Error fetching restaurant owners:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getRestaurantOwnerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!restaurantOwner) {
            res.status(404).json({ message: "Restaurant owner not found" });
            return;
        }
        res.status(200).json(restaurantOwner);
    } catch (error) {
        console.error("Error fetching restaurant owner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createRestaurantOwner = async (req: Request, res: Response) => {
    const restaurantOwnerData = req.body;
    try {
        const newRestaurantOwner = await createRestaurantOwnerService(restaurantOwnerData);
        res.status(201).json(newRestaurantOwner);
    } catch (error) {
        console.error("Error creating restaurant owner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateRestaurantOwner = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const restaurantOwnerData = req.body;
    try {
        const updatedRestaurantOwner = await updateRestaurantOwnerService(id, restaurantOwnerData);
        if (!updatedRestaurantOwner) {
            res.status(404).json({ message: "Restaurant owner not found" });
            return;
        }
        res.status(200).json({ updatedRestaurantOwner });
    } catch (error) {
        console.error("Error updating restaurant owner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteRestaurantOwner = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const deletedRestaurantOwner = await deleteRestaurantOwnerService(id);
        if (!deletedRestaurantOwner) {
            res.status(404).json({ message: "Restaurant owner not found" });
            return;
        }
        res.status(200).json({ message: "Restaurant owner deleted successfully" });
    } catch (error) {
        console.error("Error deleting restaurant owner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
