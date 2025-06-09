import { Request, Response } from "express";
import { getMenuItemService, getMenuItemByIdService, createMenuItemService, updateMenuItemService, deleteMenuItemService } from "./menu_item.service";
import { createMenuItemValidator, updateMenuItemValidator } from "../validations/menu_item.validotor";


export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await getMenuItemService();
        if (!menuItems) {
            res.status(404).json({ message: "No menu items found" });
            return;
        }
        res.status(200).json(menuItems);
        return;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const getMenuItemById = async (req: Request, res: Response) => {
    const menuItemId = parseInt(req.params.id);
    if (isNaN(menuItemId)) {
        res.status(400).json({ message: "Invalid menu item ID" });
        return;
    }

    try {
        const menuItem = await getMenuItemByIdService(menuItemId);
        if (!menuItem) {
            res.status(404).json({ message: "Menu item not found" });
            return;
        }
        res.status(200).json(menuItem);
        return;
    } catch (error) {
        console.error("Error fetching menu item:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const createMenuItem = async (req: Request, res: Response) =>
    {

 const parseResult  = createMenuItemValidator.safeParse(req.body);
 if (!parseResult.success){
    res.status(400).json({error:parseResult.error.issues})
    return;
 }
    // Extract validated data
    const menuItem = parseResult.data
    if (!menuItem. name || !menuItem.restaurantId|| !menuItem.categoryId || !menuItem.description || !menuItem.ingredients || !menuItem.price || !menuItem.active) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution

    try {
        const newMenuItem = await createMenuItemService({
            name: menuItem.name, restaurantId: menuItem.restaurantId, categoryId: menuItem.categoryId, description: menuItem.description, active: menuItem.active,
            ingredients: "",
            price: ""
        });
        res.status(201).json({ menuItem: newMenuItem });
        return;
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
}

export const updateMenuItem = async (req: Request, res: Response) => {
    const menuItemId = parseInt(req.params.id);
    const menuItemData = req.body;

    const parseResult  = updateMenuItemValidator.safeParse(req.body);
        if (!parseResult.success){
            res.status(400).json({error:parseResult.error.issues})
            return;
        }
        // Extract validated data
        const menuItem = parseResult.data
        if (!menuItem.name || !menuItem.restaurantId || !menuItem.categoryId || !
          menuItem.description || !menuItem.ingredients || !menuItem.price || !menuItem.active) {
            res.status(400).json({ error: "All fields are required" });
            return; // Prevent further execution
        }


    if (
        !menuItemData.name ||
        !menuItemData.description ||
        !menuItemData.ingredients ||
        !menuItemData.restaurantId ||
        !menuItemData.categoryId ||
        isNaN(parseFloat(menuItemData.price)) ||
        typeof menuItemData.active !== "boolean"
    ) {
        res.status(400).json({ error: "All fields are required" });
        return; // 🔥 Prevents execution from continuing
    }

    try {
        const updatedMenuItem = await updateMenuItemService(menuItemData, menuItemId);
        res.status(200).json({ menuItem: updatedMenuItem });
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
    const menuItemId = parseInt(req.params.id);
    if (isNaN(menuItemId)) {
        res.status(400).json({ message: "Invalid menu item ID" });
        return;
    }

    try {
        const deleteMessage = await deleteMenuItemService(menuItemId);
        res.status(200).json({ message: deleteMessage });
        return;
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}