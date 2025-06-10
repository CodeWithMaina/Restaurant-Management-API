import { Router } from "express";
import { 
  createAddress, 
  deleteAddress, 
  getAddressById, 
  getAddresses, 
  updateAddress 
} from "./address.controller";

export const addressRouter = Router();

addressRouter.get("/addresses", getAddresses);
addressRouter.get("/addresses/:id", getAddressById);
addressRouter.post('/addresses', createAddress);
addressRouter.put('/addresses/:id', updateAddress);
addressRouter.delete('/addresses/:id', deleteAddress);