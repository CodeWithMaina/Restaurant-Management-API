import { Router } from "express";
import { createCity,deleteCity,getcities,getCityById, updateCity} from "./city.controller";

export const cityRouter = Router();

//get all cities
cityRouter.get('/city',getcities);

//get city by id 
cityRouter.get('/city/:id',getCityById);

//craeate a new city
cityRouter.post('/city',createCity);

//update an existing city
cityRouter.put('/city/:id',updateCity);

//delete an existing user
cityRouter.delete('/city/:id',deleteCity);
