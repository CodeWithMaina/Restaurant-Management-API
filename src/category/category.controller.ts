import { Request, Response } from "express";
import {
    createNewCategoryService,
    deleteCategoryService,
    getAllCategoryService,
    getCategoryByIdService,
    updateCategoryService
} from "./category.service";
import { createCategoryValidator, updateCategoryValidator } from "../validations/category.validator"
//get all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await getAllCategoryService();
        if (allCategories?.length == 0 || allCategories ==null) {
             res.status(404).json({ message: "No categories found." });
             return;
        } else {
             res.status(200).json(allCategories);
             return;
        }
    } catch (error: any) {
         res.status(500).json({ error: error.message || "Failed to fetch categories." });
         return;
    }
};
//get vategory by id
export const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId)) {
        res.status(400).json({ error: "Invalid category ID provided." });
        return;
    }

    try {
        const foundCategory = await getCategoryByIdService(categoryId);
        if (foundCategory === null) {
             res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
             return;
        } else {
            res.status(200).json(foundCategory);
             return;
        }
    } catch (error: any) {
        console.error(`Error in getCategoryById controller for ID ${categoryId}:`, error);
       res.status(500).json({ error: error.message || `Failed to retrieve category with ID ${categoryId}.` }); 
        return ;
    }
};
//create a new category

export const createCategory = async (req: Request, res: Response) => {

    //validation
    const parseResult = createCategoryValidator.safeParse(req.body);
    if(!parseResult.success){
        res.status(400).json({error:parseResult.error.issues})
        return;
    }
    const newValues =  parseResult.data;

    if (!newValues) {
      res.status(400).json({ error: "All Fields are required" });
         return;
    }

    try {
        const newCategory = await createNewCategoryService(newValues);

        if (newCategory == null){
            res.status(500).json({message: "Failed to create Cateory"});
        }else{
            res.status(201).json({message:newCategory})
        }
    
    } catch (error: any) {
       res.status(500).json({ error: error.message || "Failed to create Category" });
         return;
    }
};
//update state
export const updateCategory = async (req: Request, res: Response) => {
    //validation
    const parseResult = updateCategoryValidator.safeParse(req.body);
    if(!parseResult.success){
        res.status(400).json({error:parseResult.error.issues})
        return
    }
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId)) {
        res.status(400).json({ error: "Invalid category ID provided." });
         return;
    }

    const updateValues = parseResult.data;
    if (!updateValues) {
        res.status(400).json({ error: "all Fields are required" });
    }

    try {
        const updatedCategory = await updateCategoryService(categoryId, updateValues);

        if (updatedCategory === null) {
             res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
        } else {
             res.status(200).json({ message: updatedCategory });
        }
    } catch (error: any) {
       res.status(500).json({ error: error.message || "Failed to Update state" });
    }
};
//delete city
export const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId)) {
         res.status(400).json({ error: "Invalid category ID provided." });
        return;
    }
   const existingState = await getCategoryByIdService(categoryId)
     if(!existingState){
    res.status(200).json({message: "Category not found"});
    return;
}
    try {
        const deletedCategory = await deleteCategoryService(categoryId);
        if(deletedCategory){
            res.status(200).json({deletedCategory});
        }else{
            res.status(404).json({message:"Category not Found"});
        }
        
    } catch (error:any) {
        res.status(500).json({error: error.message || "Failed to Delete Category"})
        
}
}