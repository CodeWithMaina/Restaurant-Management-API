
import { Router } from "express";
import { getOrderMenuItems, getOrderMenuItemById, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./orderMenuItem.controller";
export const orderMenuItemRouter = Router();

orderMenuItemRouter.get("/oder_menu_item", getOrderMenuItems);
orderMenuItemRouter.get("/oder_menu_item/:id", getOrderMenuItemById);
orderMenuItemRouter.post("/oder_Menu_item", createOrderMenuItem);
orderMenuItemRouter.put("/oder_menu_item/:id", updateOrderMenuItem);
orderMenuItemRouter.delete("/oder_menu_item/:id", deleteOrderMenuItem);
