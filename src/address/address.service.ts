import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TAddressInsert, TAddressSelect, address } from "../drizzle/schema";
 
 
//CRUD Operations for adddress entity
 
//Get all addresses
export const getAddressServices = async():Promise<TAddressSelect[] | null> => {
    return await db.query.address.findMany({
        with:{
            city: {
                columns: {
                    name: true
                }
            }   
        }
    });
}

//Get address by ID
export const getAddressByIdServices = async(id: number):Promise<TAddressSelect | undefined> => {
     return await db.query.address.findFirst({
        where: eq(address.id, id),
        with: {
            city: {
                columns:{
                    name: true
                }
            }
        }
    })  
}
 
// Create a new address
export const createAddressService = async(addressValues: TAddressInsert):Promise<string> => {
    await db.insert(address).values(addressValues).returning();
    return "Address created successfully 🎉";
}
 
// Update an existing address
export const updateAddressServices = async(id: number, addressValues: TAddressInsert):Promise<string> => {
    await db.update(address).set(addressValues).where(eq(address.id, id)).returning();
    return "Address updated successfully 😎";
}
 
 
// Delete a address
export const deleteAddressServices = async(addressId: number):Promise<string> => {
  await db.delete(address).where(eq(address.id, addressId));
  return "Address deleted successfully 🎉";
}
 