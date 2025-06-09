import { Request, Response } from "express";
import {
  createDriverService,
  deleteDriverService,
  getDriverByIdService,
  getDriverService,
  updateDriverService,
} from "./driver.service";

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await getDriverService();
    if (!drivers) {
      res.status(404).json({ message: "No drivers found" });
      return;
    }
    res.status(200).json(drivers);
    return;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getDriverById = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.id);
  if (isNaN(driverId)) {
    res.status(400).json({ message: "Invalid driver ID" });
    return;
  }

  try {
    const driver = await getDriverByIdService(driverId);
    if (!driver) {
      res.status(404).json({ message: "Driver not found" });
      return;
    }
    res.status(200).json(driver);
    return;
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const createDriver = async (req: Request, res: Response) => {
  const driverData = req.body;
  if (
    driverData.carMake == null ||
    driverData.carModel == null ||
    driverData.carYear == null ||
    driverData.delivering == null ||
    driverData.online == null ||
    driverData.userId == null
  ) {
    res
      .status(400)
      .json({ error: "All fields are required and cannot be null" });
    return;
  }

  try {
    const newDriver = await createDriverService(driverData);
    if (!newDriver) {
      res.status(500).json({ message: "Failed to create driver" });
      return;
    }
    res.status(201).json({ newDriver });
  } catch (error) {
    console.error("Error creating driver:", error); // Add this for clarity
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateDriver = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.id);

  const driver = await getDriverByIdService(driverId);
  if (!driver) {
    res.status(404).json({ message: "Driver not found" });
    return;
  }
  const driverData = req.body;

  if (
    driverData.carMake == null ||
    driverData.carModel == null ||
    driverData.carYear == null ||
    driverData.delivering == null ||
    driverData.online == null ||
    driverData.userId == null
  ) {
    res
      .status(400)
      .json({ error: "All fields are required and cannot be null" });
    return;
  }

  try {
    const updatedDriver = await updateDriverService(driverId, driverData);
    res.status(200).json({ updatedDriver });
    return;
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.id);
  const driver = await getDriverByIdService(driverId);
  if (!driver) {
    res.status(404).json({ message: "Driver not found" });
    return;
  }
  if (isNaN(driverId)) {
    res.status(400).json({ message: "Invalid driver ID" });
    return;
  }

  try {
    await deleteDriverService(driverId);
    res.status(200).json({ message: "Driver deleted successfully" });
    return;
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
