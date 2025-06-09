import { orderStatus } from './../drizzle/schema';
import {Router} from "express"
import { createorderStatus, deleteorderStatus, getorderStatusById, getorderStatus, updateorderStatus} from "../orderStatus/orderStatus.controller";

export const orderStatusRouter = Router();

//orderStatus routes definition

//Get all orderStatus
orderStatusRouter.get('/orderStatus',getorderStatus);

//Get orderStatus by Id
orderStatusRouter.get('/orderStatus/:id',getorderStatusById);


// Create a new orderStatus
orderStatusRouter.post('/orderStatus', createorderStatus);

// Update an existing orderStatus
orderStatusRouter.put('/orderStatus/:id',updateorderStatus);

// Update an existing orderStatus with partial fields
// orderStatusRouter.patch('/orderStatuss/:id', orderStatusPartial);

// Delete an existing orderStatus
orderStatusRouter.delete('/orderStatus/:id', deleteorderStatus);


