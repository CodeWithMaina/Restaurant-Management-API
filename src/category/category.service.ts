import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { category, TCategoryInsert, TCategorySelect } from "../drizzle/schema";
import { menuItem } from "../drizzle/schema";

// Get all categories with their related menu items
export const getAllCategoryService = async(): Promise<TCategorySelect[]> => {
    const categories = await db.query.category.findMany({
        with: {
            menuItems: {
                columns: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    active: true
                },
                where: eq(menuItem.active, true) // Only include active menu items
            }
        },
        orderBy: (category, { asc }) => [asc(category.name)] // Order categories by name
    });

    return categories || [];
}

// Get category by id with related menu items
export const getCategoryByIdService = async(id: number): Promise<TCategorySelect | null> => {
    if (isNaN(id)) {
        throw new Error("Invalid category ID");
    }

    const foundCategory = await db.query.category.findFirst({
        where: eq(category.id, id),
        with: {
            menuItems: {
                columns: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    active: true
                },
                where: eq(menuItem.active, true) // Only include active menu items
            }
        }
    });

    return foundCategory || null;
}

// Create a new category
export const createNewCategoryService = async (myCategory: TCategoryInsert): Promise<TCategorySelect> => {
    const [newCategory] = await db.insert(category)
        .values(myCategory)
        .returning();
    
    if (!newCategory) {
        throw new Error("Failed to create category");
    }

    return newCategory;
}

// Update an existing category
export const updateCategoryService = async (id: number, myCategory: Partial<TCategoryInsert>): Promise<TCategorySelect> => {
    if (isNaN(id)) {
        throw new Error("Invalid category ID");
    }

    const [updatedCategory] = await db.update(category)
        .set(myCategory)
        .where(eq(category.id, id))
        .returning();

    if (!updatedCategory) {
        throw new Error("Category not found");
    }

    return updatedCategory;
}

// Delete a category (with check for existing menu items)
export const deleteCategoryService = async(id: number): Promise<TCategorySelect> => {
    if (isNaN(id)) {
        throw new Error("Invalid category ID");
    }

    // First check if there are any active menu items using this category
    const existingMenuItems = await db.query.menuItem.findMany({
        where: eq(menuItem.categoryId, id)
    });

    if (existingMenuItems.length > 0) {
        throw new Error("Cannot delete category as it has associated menu items");
    }

    const [deletedCategory] = await db.delete(category)
        .where(eq(category.id, id))
        .returning();

    if (!deletedCategory) {
        throw new Error("Category not found");
    }

    return deletedCategory;
}