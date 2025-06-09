import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { category, TCategoryInsert, TCategorySelect } from "../drizzle/schema"



//get all category
export const getAllCategoryService = async():Promise<TCategorySelect[] | null>=>{
return await db.query.category.findMany();
}

//get category by id 
export const getCategoryByIdService =async(id:number):Promise< TCategoryInsert | undefined> => {
    return await db.query.category.findFirst({
       where: eq(category.id,id)
    })
}

//create a new category
export const createNewCategoryService = async (myCategory:TCategoryInsert):Promise<string>=>{
await db.insert(category).values(myCategory).returning();
return  "category created successfully 🎉";
}

//update an existing category
export const updateCategoryService = async (id:number,mycategory:Partial<TCategoryInsert>):Promise<string> =>{
    await db.update(category).set(mycategory).where( eq(category.id,id)).returning();
      return "Category updated successfully 😎";
}

//delete a category
export const deleteCategoryService = async(id:number):Promise<string>=>{
await db.delete(category).where (eq(category.id,id));
return "Category deleted successfully 🎉"
}


