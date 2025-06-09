import { Router } from "express";
import { createState, deleteCity, getStateById, getStates, updateState } from "./state.controller";
export const stateRouter = Router();

//get all states
stateRouter.get('/state',getStates);

//get state by id 
stateRouter.get('/state/:id',getStateById);

//create a state
stateRouter.post('/state',createState);

//update an existing state
stateRouter.put('/state/:id',updateState);

//delete an existing state
stateRouter.delete('/state/:id',deleteCity);