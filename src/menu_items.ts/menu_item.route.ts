
import { Router } from "express";
import { getMenuItems, getMenuItemById,  deleteMenuItem, createMenuItem, updateMenuItem } from "./menu_item.controller";

export const menuItemRouter = Router();

menuItemRouter.get("/menu_item", getMenuItems);
menuItemRouter.get("/menu_item/:id", getMenuItemById);
menuItemRouter.post("/menu_item", createMenuItem);
menuItemRouter.put("/menu_item/:id", updateMenuItem);
menuItemRouter.delete("/menu_item/:id", deleteMenuItem);
