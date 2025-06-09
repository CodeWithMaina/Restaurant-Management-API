import { Request, Response } from "express";
import {
  createorderStatusServices,
  deleteorderStatusServices,
  getorderStatusByIdServices,
  updateorderStatusServices,
  getorderStatusServices,
} from "./orderStatus.service";

// Get all orderStatus
export const getorderStatus = async (req: Request, res: Response) => {
  try {
    const allorderStatus = await getorderStatusServices();
    if (!allorderStatus || allorderStatus.length === 0) {
      res.status(404).json({ message: "No orderStatus found" });
    } else {
      res.status(200).json(allorderStatus);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch orderStatus" });
  }
};

// Get orderStatus by ID
export const getorderStatusById = async (req: Request, res: Response) => {
  const orderStatusId = parseInt(req.params.id);
  if (isNaN(orderStatusId)) {
    res.status(400).json({ error: "Invalid orderStatus ID" });
    return;
  }

  try {
    const orderStatus = await getorderStatusByIdServices(orderStatusId);
    if (!orderStatus) {
      res.status(404).json({ message: "orderStatus not found" });
    } else {
      res.status(200).json(orderStatus);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch orderStatus" });
  }
};

// Create new orderStatus
export const createorderStatus = async (req: Request, res: Response) => {
  const orderStatusData = req.body;

  try {
    const neworderStatus = await createorderStatusServices(orderStatusData);
    if (!neworderStatus) {
      res.status(500).json({ message: "Failed to create orderStatus" });
    } else {
      res.status(201).json(neworderStatus);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create orderStatus" });
  }
};

// Update orderStatus
export const updateorderStatus = async (req: Request, res: Response) => {
  const orderStatusId = parseInt(req.params.id);
  if (isNaN(orderStatusId)) {
    res.status(400).json({ error: "Invalid orderStatus ID" });
    return;
  }

  const updateData = req.body;

  try {
    const updatedorderStatus = await updateorderStatusServices(orderStatusId, updateData);
    if (!updatedorderStatus) {
      res.status(404).json({ message: "orderStatus not found or failed to update" });
    } else {
      res.status(200).json(updatedorderStatus);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update orderStatus" });
  }
};

// Delete orderStatus
export const deleteorderStatus = async (req: Request, res: Response) => {
  const orderStatusId = parseInt(req.params.id);
  if (isNaN(orderStatusId)) {
    res.status(400).json({ error: "Invalid orderStatus ID" });
    return;
  }

  try {
    const deletedorderStatus = await deleteorderStatusServices(orderStatusId);
    if (!deletedorderStatus) {
      res.status(404).json({ message: "orderStatus not found" });
    } else {
      res.status(200).json({ message: "orderStatus deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete orderStatus" });
  }
};
