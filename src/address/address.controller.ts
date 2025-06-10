import { Request, RequestHandler, Response } from "express";
import {
  createAddressService,
  deleteAddressServices,
  getAddressByIdServices,
  getAddressServices,
  updateAddressServices,
} from "./address.service";
import { CreateAddressInput, UpdateAddressInput, validateCreateAddress, validateUpdateAddress } from "../validations/address.validator";
import { TAddressInsert } from "../drizzle/schema";

//Business logic for address-related operations
export const getAddresses: RequestHandler = async (req: Request, res: Response) => {
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

export const getAddressById: RequestHandler = async (req: Request, res: Response) => {
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

export const createAddress: RequestHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = validateCreateAddress(req.body);
    const newAddress = await createAddressService(validatedData);
    res.status(201).json({ message: newAddress });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to create address" });
  }
};

export const updateAddress: RequestHandler = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.id);
   if (isNaN(addressId)) {
    res.status(400).json({ error: "Invalid address ID" });
    return;
  }

   try {
    // Check if address exists
    if (!await getAddressByIdServices(addressId)) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    // Validate and get update fields
    const updateFields = validateUpdateAddress({
      ...req.body,
      id: addressId,
    });

    // Create type-safe update payload
    const updatePayload: TAddressInsert & { id: number } = {
      // Start with empty defaults
      streetAddress1: '',
      userId: 0,
      cityId: 0,
      // Add the ID
      id: addressId,
      // Override with validated fields
      ...updateFields,
    };

    // Remove undefined values to prevent overwriting with undefined
    const cleanPayload = Object.fromEntries(
      Object.entries(updatePayload).filter(([_, v]) => v !== undefined)
    ) as TAddressInsert & { id: number };

    const result = await updateAddressServices(addressId, cleanPayload);
    res.status(200).json({ message: result });
  }  catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to update address" });
  }
};

export const deleteAddress: RequestHandler = async (req: Request, res: Response) => {
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