import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
    updateCategory
} from "./category.controller"; // Make sure this path is correct

export const categoryRouter = Router();

// Get all categories
categoryRouter.get('/category', getCategories);

// Get category by ID
categoryRouter.get('/category/:id', getCategoryById);

// Create a category
categoryRouter.post('/category', createCategory);

// Update an existing category
categoryRouter.put('/category/:id', updateCategory);

// Delete an existing category
categoryRouter.delete('/category/:id', deleteCategory);