// auth.service.ts
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUsersInsert, users } from "../drizzle/schema";
import { TUserWithRelations } from "../types/user.types";


type QueryOptions = {
  with?: {
    ownedRestaurants?: {
      with?: {
        restaurant?: boolean;
      };
    };
    addresses?: boolean;
    driver?: boolean;
  };
};

// Create a new user
export const createUserServices = async (user: TUsersInsert): Promise<string> => {
    await db.insert(users).values(user).returning();
    return "User Created Successfully 😎";
}

// Get user by email with optional relations
export const getUserByEmailService = async (
  email: string,
  withRelations?: {
    ownedRestaurants?: {
      with?: {
        restaurant?: true;
      };
    };
    addresses?: true;
    driver?: true;
  }
): Promise<TUserWithRelations | undefined> => {
  const result = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: withRelations
  });
  
  return result as TUserWithRelations;
};

export const updateUserPasswordService = async (
    email: string, 
    newPassword: string
): Promise<string> => {
    const result = await db.update(users)
        .set({ password: newPassword })
        .where(eq(users.email, email))
        .returning();

    if (result.length === 0) {
        throw new Error("User not found or password update failed");
    }
    
    return "Password updated successfully";
}