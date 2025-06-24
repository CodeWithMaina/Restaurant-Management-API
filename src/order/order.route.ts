import { orders } from './../drizzle/schema';
import {Router} from "express"
import { createOrder, deleteOrder, getOrderById, getOrderItemsByRestaurantIdController, getOrders, updateOrder } from './order.controller';


export const ordersRouter = Router();

//orders routes definition

//Get all orders
ordersRouter.get('/orders',getOrders);

//Get order by Id
ordersRouter.get('/orders/:id',getOrderById);


// Create a new order
ordersRouter.post('/orders', createOrder);

// Update an existing order
ordersRouter.put('/orders/:id',updateOrder);

// Update an existing user with partial fields
// userRouter.patch('/users/:id', updateUserPartial);

// Delete an existing user
ordersRouter.delete('/orders/:id', deleteOrder);

// Get orders with restaurant id
// Add this to order.route.ts
ordersRouter.get('/orders/:restaurant/:id', getOrderItemsByRestaurantIdController);
