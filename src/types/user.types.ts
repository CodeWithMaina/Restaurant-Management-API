// user.types.ts
import { TUsersSelect } from "../drizzle/schema";
import { TRestaurantSelect, TRestaurantOwnerSelect } from "../drizzle/schema";

export type TUserWithRelations = TUsersSelect & {
  ownedRestaurants?: Array<TRestaurantOwnerSelect & {
    restaurant: TRestaurantSelect;
  }>;
  addresses?: Array<{
    id: number;
    streetAddress1: string;
    streetAddress2?: string;
    zipCode?: string;
    deliveryInstructions?: string;
    userId: number;
    cityId: number;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  }>;
  driver?: {
    id: number;
    carMake: string;
    carModel: string;
    carYear: number;
    userId: number;
    online?: boolean;
    delivering?: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  };
};