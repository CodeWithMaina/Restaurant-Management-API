import { Router, Request, Response } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./user.controller";

export const userRouter = Router();

// User routes definition

// Get all users
userRouter.get('/users', getUsers as any);

// Get user by ID
userRouter.get('/users/:id', getUserById as any);

// Create a new user
userRouter.post('/users', createUser as any);

// Update an existing user
userRouter.put('/users/:id', updateUser as any);

// Delete an existing user
userRouter.delete('/users/:id', deleteUser as any);