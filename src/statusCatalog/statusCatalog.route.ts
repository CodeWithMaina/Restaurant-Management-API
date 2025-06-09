
import { Router } from "express";
import {
  createStatusCatalog,
  deleteStatusCatalog,
  getStatusCatalog,
  getStatusCatalogById,
  updateStatusCatalog
} from "../statusCatalog/statusCatalog.controller";

export const statusCatalogRouter = Router();

//statusCatalog definition

// Get all statusCatalog 
statusCatalogRouter.get('/statusCatalog', getStatusCatalog);

// Get statusCatalog by ID
statusCatalogRouter.get('/statusCatalog/:id', getStatusCatalogById);

// Create a new statusCatalog
statusCatalogRouter.post('/statusCatalog/', createStatusCatalog);

// Update an existing statusCatalog
statusCatalogRouter.put('/statusCatalog/:id', updateStatusCatalog);

// Delete an existing statusCatalog
statusCatalogRouter.delete('/statusCatalog/:id', deleteStatusCatalog);


