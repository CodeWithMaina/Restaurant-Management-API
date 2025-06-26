import { Request, Response } from "express";
import {
  getMenuItemService,
  getMenuItemByIdService,
  createMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
  getMenuItemByRestaurantIdService,
  getMenuItemByCategoryIdService,
} from "./menu_item.service";
import {
  MenuItemIdSchema,
  CreateMenuItemSchema,
  UpdateMenuItemSchema,
} from "../validations/menu_item.validotor";
import z from "zod";

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await getMenuItemService();
    if (!menuItems) {
      res.status(404).json({ message: "No menu items found" });
      return;
    }
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = MenuItemIdSchema.parse({ id: Number(req.params.id) });
    const menuItem = await getMenuItemByIdService(id);
    
    if (!menuItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    
    res.status(200).json(menuItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error fetching menu item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const validatedData = CreateMenuItemSchema.parse(req.body);
    const newMenuItem = await createMenuItemService(validatedData);
    res.status(201).json({ message: newMenuItem });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error creating menu item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const validatedData = UpdateMenuItemSchema.parse({ ...req.body, id });
    
    const updatedMenuItem = await updateMenuItemService(validatedData, id);
    res.status(200).json({ message: updatedMenuItem });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error updating menu item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = MenuItemIdSchema.parse({ id: Number(req.params.id) });
    const deleteMessage = await deleteMenuItemService(id);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// getOrderItemsByRestaurantId Controller

export const getMenuItemByRestaurantIdController = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id);
  if (isNaN(restaurantId)) {
    res.status(400).json({ error: "Invalid restaurant ID" });
    return;
  }

  try {
    const orders = await getMenuItemByRestaurantIdService(restaurantId);
    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "No menu items found for this restaurant" });
    } else {
      res.status(200).json(orders);
    }

  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch menu items" });
  }
};


export const getMenuItemByCategoryIdController = async (req: Request, res: Response) => {
  try {
    const { id } = MenuItemIdSchema.parse({ id: Number(req.params.id) });
    const menuItems = await getMenuItemByCategoryIdService(id);
    
    if (!menuItems || menuItems.length === 0) {
      res.status(404).json({ message: "No menu items found for this category" });
      return;
    }
    
    res.status(200).json(menuItems);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error fetching menu items by category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};