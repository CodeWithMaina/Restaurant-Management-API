import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TStatusCatalogInsert, TStatusCatalogSelect, statusCatalog } from "../drizzle/schema";

// Get all statusCatalog 
export const getStatusCatalogServices = async (): Promise<TStatusCatalogSelect[] | null> => {
  return await db.query.statusCatalog.findMany({});
};

// Get statusCatalog  by ID
export const getStatusCatalogByIdServices = async (catalogId: number): Promise<TStatusCatalogSelect | undefined> => {
  return await db.query.statusCatalog.findFirst({
    where: eq(statusCatalog.id, catalogId),
  });
};

// Create a new statusCatalog 
export const createStatusCatalogServices = async (statusCatalogData: TStatusCatalogInsert): Promise<string> => {
  await db.insert(statusCatalog).values(statusCatalogData).returning();
  return "statusCatalog created successfully 🎉";
};

// Update a statusCatalog 
export const updateStatusCatalogServices = async (
  statusCatalogId: number,
  statusCatalogData: TStatusCatalogInsert
): Promise<string> => {
  await db.update(statusCatalog).set(statusCatalogData).where(eq(statusCatalog.id, statusCatalogId)).returning();
  return "statusCatalog updated successfully 🎉";
};

// Delete a statusCatalog 
export const deleteStatusCatalogServices = async (statusCatalogId: number): Promise<string> => {
  await db.delete(statusCatalog).where(eq(statusCatalog.id, statusCatalogId)).returning();
  return "statusCatalog deleted successfully 🎉";
};
