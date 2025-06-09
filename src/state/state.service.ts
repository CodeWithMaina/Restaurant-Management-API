import { eq } from "drizzle-orm";
import db from "../drizzle/db"
import { state, TCityInsert, TStateInsert, TStateSelect } from "../drizzle/schema"



//get all states
export const getAllStatesService = async():Promise<TStateSelect[] | null>=>{
return await db.query.state.findMany();
}

//get state by id 
export const getStateByIdService =async(id:number):Promise<TStateSelect | undefined> => {
    return await db.query.state.findFirst({
       where: eq(state.id,id)
    })
}

//create a new state
export const createNewStateService = async (myState:TCityInsert):Promise<string>=>{
await db.insert(state).values(myState).returning();
return  "state created successfully 🎉";
}

//update an existing state
export const updateStateService = async (id:number,mystate:Partial<TStateInsert>):Promise<string> =>{
    await db.update(state).set(mystate).where( eq(state.id,id)).returning();
      return "state updated successfully 😎";
}

//delete a state
export const deleteStateService = async(id:number):Promise<string>=>{
await db.delete(state).where (eq(state.id,id));
return "state deleted successfully 🎉"
}


