import { Request, Response } from "express";
import {
  createOrderServices,
  deleteOrderServices,
  getOrderByIdServices,
  getOrdersServices,
  updateOrderServices
} from "./order.service";

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await getOrdersServices();
    if (!allOrders || allOrders.length === 0) {
      res.status(404).json({ message: "No orders found" });
    } else {
      res.status(200).json(allOrders);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch orders" });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Invalid order ID" });
    return;
  }

  try {
    const order = await getOrderByIdServices(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch order" });
  }
};

// Create new order 
export const createOrder = async (req: Request, res: Response) => {
  const orders = req.body;
  if (!orders || Object.keys(orders).length === 0) {
    res.status(400).json({ error: "Order data is required" });
    return;
  }

  try {
    const newOrder = await createOrderServices(orders);
    if (!newOrder) {
      res.status(500).json({ message: "Failed to create order" });
    } else {
      res.status(201).json(newOrder);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
};

// Update order 
export const updateOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Invalid order ID" });
    return;
  }

  const updateData = req.body;

    if (updateData.estimatedDeliveryTime) {
        updateData.estimatedDeliveryTime = new Date(updateData.estimatedDeliveryTime);
    }
    if (updateData.actualDeliveryTime) {
        updateData.actualDeliveryTime = new Date(updateData.actualDeliveryTime);
    }
  if (!updateData || Object.keys(updateData).length === 0) {
    res.status(400).json({ error: "Update data is required" });
    return;
  }

  try {
    const updatedOrder = await updateOrderServices(orderId, updateData);
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found or failed to update" });
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update order" });
  }
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Invalid order ID" });
    return;
  }

  try {
    const deletedOrder = await deleteOrderServices(orderId);
    if (!deletedOrder) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json({ message: "Order deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete order" });
  }
};
