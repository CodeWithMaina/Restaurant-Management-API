import { Request, Response } from "express";
import {
  createNewStateService,
  deleteStateService,
  getAllStatesService,
  getStateByIdService,
  updateStateService,
} from "./state.service";

//get all states
export const getStates = async (req: Request, res: Response) => {
  try {
    const allStates = await getAllStatesService();
    if (allStates == null || allStates.length == 0) {
      res.status(404).json({ message: "No states found" });
    } else {
      res.status(200).json(allStates);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to Fetch States" });
  }
};

//get state by id
export const getStateById = async (req: Request, res: Response) => {
  const stateId = parseInt(req.params.id);
  if (isNaN(stateId)) {
    res.status(400).json({ error: "Invalid State Id" });
  }
  try {
    const findState = await getStateByIdService(stateId);
    if (findState == null) {
      res.status(404).json({ message: "State not Found" });
    } else {
      res.status(200).json(findState);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to get state by id " });
    return;
  }
};

//create  anew state

export const createState = async (req: Request, res: Response) => {
  const newValues = req.body;
  if (!newValues) {
    res.status(400).json({ error: "All Fields are required" });
    return;
  }

  try {
    const newState = await createNewStateService(newValues);
    if (newState == null) {
      res.status(500).json({ message: "Failed to create a state" });
    } else {
      res.status(201).json({ message: newState });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to create a state" });
  }
};

//update state
export const updateState = async (req: Request, res: Response) => {
  const stateId = parseInt(req.params.id);
  const findState = await getStateByIdService(stateId);
  if (findState == null) {
    res.status(404).json({ message: "State not Found" });
    return;
  }
  if (isNaN(stateId)) {
    res.status(400).json({ error: "Invalid State Id" });
    return;
  }
  const allStateValues = req.body;
  if (!allStateValues) {
    res.status(400).json({ error: "All Fields are required" });
  }
  try {
    const updatedState = await updateStateService(stateId, allStateValues);
    if (updatedState == null) {
      res.status(404).json({ message: "State not Found" });
    } else {
      res.status(200).json({ message: updatedState });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to Update state" });
  }
};
//delete a city

export const deleteCity = async (req: Request, res: Response) => {
  const stateId = parseInt(req.params.id);
  const findState = await getStateByIdService(stateId);
  if (findState == null) {
    res.status(404).json({ message: "State not Found" });
    return;
  }
  if (isNaN(stateId)) {
    res.status(400).json({ error: "Invalid State Id" });
    return;
  }
  try {
    const deletedState = await deleteStateService(stateId);
    if (deletedState) {
      res.status(200).json({ deletedState });
    } else {
      res.status(404).json({ message: "City not Found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to Delete State" });
  }
};
