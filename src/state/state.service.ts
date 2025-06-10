import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { state, TStateInsert, TStateSelect } from "../drizzle/schema";
import { PartialStateInput, PartialStateSchema, StateInput, StateSchema } from "../validations/state.validator";

//get all states with cities
export const getAllStatesService = async (): Promise<TStateSelect[] | null> => {
  return await db.query.state.findMany({
    with: {
      cities: true
    }
  });
};

//get state by id with cities
export const getStateByIdService = async (id: number): Promise<TStateSelect | undefined> => {
  return await db.query.state.findFirst({
    where: eq(state.id, id),
    with: {
      cities: true
    }
  });
};

//create a new state
export const createNewStateService = async (stateData: StateInput): Promise<TStateSelect> => {
  const validatedData = StateSchema.parse(stateData);
  const result = await db.insert(state).values(validatedData).returning();
  return result[0];
};

//update an existing state
export const updateStateService = async (id: number, stateData: PartialStateInput): Promise<TStateSelect> => {
  const validatedData = PartialStateSchema.parse(stateData);
  const result = await db.update(state)
    .set(validatedData)
    .where(eq(state.id, id))
    .returning();
  return result[0];
};

//delete a state
export const deleteStateService = async (id: number): Promise<TStateSelect> => {
  const result = await db.delete(state)
    .where(eq(state.id, id))
    .returning();
  return result[0];
};