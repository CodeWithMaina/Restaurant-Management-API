
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUsersInsert, TUsersSelect, users } from "../drizzle/schema";

// Create a new user
export const createUserServices = async(user:TUsersInsert):Promise<string> => {
    await db.insert(users).values(user).returning();
    return "User Created Successfully 😎"
}

// Get user by email
export const  getUserByEmailService = async(email:string): Promise<TUsersSelect | undefined> => {
    return await db.query.users.findFirst({
        where:(eq(users.email,email))
    });
}

export const updateUserPasswordService = async (email: string, newPassword: string): Promise<string> => {
    const result = await db.update(users)
        .set({ password: newPassword })
        .where(eq(users.email, email))
        .returning();

    if (result.length === 0) {
        throw new Error("User not found or password update failed");
    }
    
    return "Password updated successfully";
}