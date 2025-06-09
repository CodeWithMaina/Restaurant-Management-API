import { Request, Response } from "express";
import {
  createStatusCatalogServices,
  deleteStatusCatalogServices,
  getStatusCatalogByIdServices,
  updateStatusCatalogServices,
  getStatusCatalogServices,
} from "./statusCatalog.service";

// Get all statusCatalog
export const getStatusCatalog = async (req: Request, res: Response) => {
  try {
    const allStatusCatalog = await getStatusCatalogServices();
    if (!allStatusCatalog || allStatusCatalog.length === 0) {
      res.status(404).json({ message: "No statusCatalog found" });
    } else {
      res.status(200).json(allStatusCatalog);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch statusCatalog" });
  }
};

// Get statusCatalog by ID
export const getStatusCatalogById = async (req: Request, res: Response) => {
  const catalogId = parseInt(req.params.id);
  if (isNaN(catalogId)) {
    res.status(400).json({ error: "Invalid statusCatalog ID" });
    return;
  }

  try {
    const statusCatalog = await getStatusCatalogByIdServices(catalogId);
    if (!statusCatalog) {
      res.status(404).json({ message: "statusCatalog not found" });
    } else {
      res.status(200).json(statusCatalog);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch statusCatalog" });
  }
};

// Create new statusCatalog
export const createStatusCatalog = async (req: Request, res: Response) => {
  const statusCatalogData = req.body;

  try {
    const newStatusCatalog = await createStatusCatalogServices(statusCatalogData);
    res.status(201).json(newStatusCatalog);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create statusCatalog" });
  }
};

// Update statusCatalog
export const updateStatusCatalog = async (req: Request, res: Response) => {
  const catalogId = parseInt(req.params.id);
  if (isNaN(catalogId)) {
    res.status(400).json({ error: "Invalid statusCatalog ID" });
    return;
  }

  const updateData = req.body;

  try {
    const updatedStatusCatalog = await updateStatusCatalogServices(catalogId, updateData);
    if (!updatedStatusCatalog) {
      res.status(404).json({ message: "statusCatalog not found or failed to update" });
    } else {
      res.status(200).json(updatedStatusCatalog);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update statusCatalog" });
  }
};

// Delete statusCatalog
export const deleteStatusCatalog = async (req: Request, res: Response) => {
  const catalogId = parseInt(req.params.id);
  if (isNaN(catalogId)) {
    res.status(400).json({ error: "Invalid statusCatalog ID" });
    return;
  }

  try {
    const deletedStatusCatalog = await deleteStatusCatalogServices(catalogId);
    if (!deletedStatusCatalog) {
      res.status(404).json({ message: "statusCatalog not found" });
    } else {
      res.status(200).json({ message: "statusCatalog deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete statusCatalog" });
  }
};
