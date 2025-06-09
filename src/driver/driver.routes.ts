import { Router } from "express";
import { createDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver } from "./driver.controller";


export const driverRouter = Router();

driverRouter.get("/drivers", getAllDrivers);
driverRouter.get("/drivers/:id", getDriverById);
driverRouter.post("/drivers", createDriver);
driverRouter.put("/drivers/:id", updateDriver);
driverRouter.delete("/drivers/:id", deleteDriver);