import { Request, Response, RequestHandler } from "express";
import {
  createCityService,
  deleteCityService,
  getCityByIdService,
  getCityService,
  updateCityService,
} from "./city.service";
import { cityIdSchema, CreateCityInput, createCitySchema, UpdateCityInput, updateCitySchema } from "../validations/city.validator";
import { TCityInsert } from "../drizzle/schema";
import { z } from "zod";

//get all cities
export const getcities: RequestHandler = async (req: Request, res: Response) => {
  try {
    const allcities = await getCityService();
    if (allcities == null || allcities.length == 0) {
      res.status(404).json({ message: "No Cities Found" });
    } else {
      res.status(200).json(allcities);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch cities" });
  }
};

//get city by id
export const getCityById: RequestHandler = async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.id);
  if (isNaN(cityId)) {
    res.status(400).json({ error: "Invalid city ID" });
    return;
  }
  try {
    const findCity = await getCityByIdService(cityId);
    if (findCity == null) {
      res.status(404).json({ message: "city not found" });
    } else {
      res.status(200).json(findCity);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed tp Fetch city" });
  }
};

//create a new city
export const createCity: RequestHandler = async (req: Request, res: Response) => {
  try {
     const validatedData: CreateCityInput = createCitySchema.parse(req.body);
    const newCity = await createCityService(validatedData);
    if (newCity == null) {
      res.status(500).json({ message: "Failed to create city" });
    } else {
      res.status(201).json({ message: newCity });
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: error.message || "Failed to create city" });
  }
};

// Update a city
export const updateCity: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = cityIdSchema.parse(req.params);
    const validatedData: UpdateCityInput = updateCitySchema.parse(req.body);
    
    const findCity = await getCityByIdService(id);
    if (!findCity) {
      res.status(404).json({ message: "City not found" });
      return;
    }

    // Convert to TCityInsert with non-null assertion since we've validated
    const updateData: Partial<TCityInsert> = {
      name: validatedData.name,
      stateId: validatedData.stateId
    };

    const updatedCity = await updateCityService(id, updateData);
    res.status(200).json({ message: updatedCity });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors.map(e => ({
          field: e.path[0],
          message: e.message
        }))
      });
      return;
    }
    res.status(500).json({ error: error.message || "Failed to update city" });
  }
};

//delete a city
export const deleteCity: RequestHandler = async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.id);
  if (isNaN(cityId)) {
    res.status(400).json({ error: "Invalid City ID" });
    return;
  }
  
  const findCity = await getCityByIdService(cityId);
  if (findCity == null) {
    res.status(404).json({ message: "city not found" });
    return;
  }
  
  try {
    const deletedCity = await deleteCityService(cityId);
    if (deletedCity) {
      res.status(200).json({ message: deletedCity });
    } else {
      res.status(404).json({ message: "City not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete city" });
  }
};