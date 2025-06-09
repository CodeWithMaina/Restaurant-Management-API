import { Request, Response } from "express";
import {
  createAddressService,
  deleteAddressServices,
  getAddressByIdServices,
  getAddressServices,
  updateAddressServices,
} from "./address.service";

//Business logic for address-related operations
export const getAddresses = async (req: Request, res: Response) => {
  try {
    const allAddresses = await getAddressServices();
    if (allAddresses == null || allAddresses.length == 0) {
      res.status(404).json({ message: "No addresses found" });
    } else {
      res.status(200).json(allAddresses);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch addresses" });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.id);
  if (isNaN(addressId)) {
    res.status(400).json({ error: "Invalid address ID" });
    return; // Prevent further execution
  }
  try {
    const address = await getAddressByIdServices(addressId);
    if (address == null) {
      res.status(404).json({ message: "Address not found" });
    } else {
      res.status(200).json(address);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch address" });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  const address = req.body;
  if (
    !address.cityId ||
    !address.zipCode ||
    !address.streetAddress1 ||
    !address.streetAddress2 ||
    !address.userId ||
    !address.deliveryInstructions
  ) {
    res.status(400).json({ error: "All fields are required" });
    return; // Prevent further execution
  }
  try {
    const newAddress = await createAddressService(address);
    if (newAddress == null) {
      res.status(500).json({ message: "Failed to create address" });
    } else {
      res.status(201).json({ message: newAddress });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to create address" });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.id);
  const address = await getAddressByIdServices(addressId);
  if (address == null) {
    res.status(404).json({ message: "Address not found" });
    return;
  }

  const addressData = req.body;
  if (
    !addressData.cityId ||
    !addressData.zipCode ||
    !addressData.streetAddress1 ||
    !addressData.userId ||
    !addressData.deliveryInstructions
  ) {
    res.status(400).json({ error: "All fields are required" });
    return; // Prevent further execution
  }
  try {
    const updatedAddress = await updateAddressServices(addressId, addressData);
    if (updatedAddress == null) {
      res
        .status(404)
        .json({ message: "Address not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedAddress });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to update address" });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.id);
  const address = await getAddressByIdServices(addressId);
  if (address == null) {
    res.status(404).json({ message: "Address not found" });
    return;
  }
  if (isNaN(addressId)) {
    res.status(400).json({ error: "Invalid address ID" });
    return; // Prevent further execution
  }
  try {
    const existingAddress = await getAddressByIdServices(addressId);

    if (!existingAddress) {
      res.status(200).json({ message: "Address does not exit" });
      return;
    }
    const deleteAddress = await deleteAddressServices(addressId);
    if (deleteAddress) {
      res.status(200).json({ message: deleteAddress });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to delete address" });
  }
};
