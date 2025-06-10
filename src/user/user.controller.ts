import { Request, Response } from "express";
import {
  createUserServices,
  deleteUserServices,
  getUserByIdServices,
  getUsersServices,
  updateUserServices,
} from "./user.service";

// Business logic for user-related operations

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const allUsers = await getUsersServices();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(allUsers);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const user = await getUserByIdServices(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, contactPhone, userType } = req.body;
  
  if (!name || !email || !password || !contactPhone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = await createUserServices({
      userType: userType || 'customer', // Default to 'customer' if not provided
      name,
      email,
      password,
      contactPhone,
      phoneVerified: false, // Default value
      emailVerified: false // Default value
    });

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
    return res.status(201).json({ message: newUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = await getUserByIdServices(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, password, contactPhone } = req.body;
  if (!name || !email || !password || !contactPhone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedUser = await updateUserServices(userId, {
      name,
      email,
      password,
      contactPhone,
      // Include other fields if needed
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or failed to update" });
    }
    return res.status(200).json({ message: updatedUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = await getUserByIdServices(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const deletedUser = await deleteUserServices(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to delete user" });
  }
};