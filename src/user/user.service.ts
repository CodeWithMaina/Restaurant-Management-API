import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUsersInsert, TUsersSelect, users } from "../drizzle/schema";

 
 
//CRUD Operations for User entity
 
 
//Get all users
export const getUsersServices = async():Promise<TUsersSelect[] | null> => {
     return await  db.query.users.findMany();
}
 
//Get user by ID
export const getUserByIdServices = async(usersId: number):Promise<TUsersSelect | undefined>=> {
      return await db.query.users.findFirst({
        where: eq(users.id,usersId)
      })
}
 
// Create a new user
export const createUserServices = async(user:TUsersInsert):Promise<string> => {
       await db.insert(users).values(user).returning();
        return "User Created Successfully 😎"
}
 
// Update an existing user
export const updateUserServices = async(usersId: number, user:TUsersInsert):Promise<string> => {
    await db.update(users).set(user).where(eq(users.id,usersId));
    return "User Updated Succeffully 😎";
}
 
 
export const deleteUserServices = async(usersId: number):Promise<string> => {
   await db.delete(users).where(eq(users.id,usersId));
   return "User Delete Sucessfully";
}