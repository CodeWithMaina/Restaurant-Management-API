import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { users, TUsersInsert, TUsersSelect } from "../drizzle/schema";
import { PartialUserInput, PartialUserSchema, UserInput, UserSchema } from "../validations/user.validator";

export const getUsersServices = async (): Promise<TUsersSelect[] | null> => {
  return await db.query.users.findMany({
    with: {
      addresses: {
        with: {
          city: {
            with: {
              state: true
            }
          }
        }
      },
      driver: {
        columns: {
          id: true,
          carMake: true,
          carModel: true,
          carYear: true,
          online: true,
          delivering: true,
        }
      },
      ownedRestaurants: {
        with: {
          restaurant: true
        }
      },
      orders: {
        with: {
          orderItems: true,
          statuses: true
        }
      },
      comments: true
    }
  });
};

export const getUserByIdServices = async (userId: number): Promise<TUsersSelect | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      addresses: {
        with: {
          city: {
            with: {
              state: true
            }
          }
        }
      },
      driver: true,
      ownedRestaurants: {
        with: {
          restaurant: true
        }
      },
      orders: {
        with: {
          orderItems: true,
          statuses: true
        }
      },
      comments: true
    }
  });
};

export const createUserServices = async (userData: UserInput): Promise<TUsersSelect> => {
  const validatedData = UserSchema.parse(userData);
  const result = await db.insert(users).values(validatedData).returning();
  return result[0];
};

export const updateUserServices = async (userId: number, userData: PartialUserInput): Promise<TUsersSelect> => {
  const validatedData = PartialUserSchema.parse(userData);
  const result = await db.update(users)
    .set(validatedData)
    .where(eq(users.id, userId))
    .returning();
  return result[0];
};

export const deleteUserServices = async (userId: number): Promise<TUsersSelect> => {
  const result = await db.delete(users)
    .where(eq(users.id, userId))
    .returning();
  return result[0];
};