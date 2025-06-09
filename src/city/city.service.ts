
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { city, TCityInsert, TCitySelect } from "../drizzle/schema";


//CRUD Operations for City entity

//Get all citys
export const getCityService = async():Promise<TCitySelect[] | null> => {
    return await db.query.city.findMany({
        with:{
            state:{
                columns:{
                    name: true,
                    code:true

                }
            }
        }
    });

}

//Get city by ID
export const getCityByIdService = async(id: number):Promise<TCitySelect | undefined> => {
     return await db.query.city.findFirst({
        where: eq(city.id, id),
        with:{
            state:{
                columns:{
                    name: true,
                    code:true

                }
            }
        }
    })  
}

// Create a new city
export const createCityService = async(myCity: TCityInsert):Promise<string> => {
    await db.insert(city).values(myCity).returning();
    return "city created successfully 🎉";
}

// Update an existing city
export const updateCityService= async(id: number, mycity:TCityInsert):Promise<string> => {
    await db.update(city).set(mycity).where(eq(city.id, id));
    return "city updated successfully 😎";
}


// Delete a city

export const deleteCityService= async(Id: number):Promise<string> => {
  await db.delete(city).where(eq(city.id, Id));
  return "City deleted successfully 🎉"
}