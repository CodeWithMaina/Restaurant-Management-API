import express, { Application,Response } from 'express';
import dotenv from 'dotenv';
import { cityRouter } from './city/city.route';
import { userRouter } from './users/user.route';
import { restaurantOwnerRouter } from './restaurantOwner/restaurantOwner.routes';
import { driverRouter } from './driver/driver.routes';
import { addressRouter } from './address/address.routes';
import { ordersRouter } from './orders/orders.routes';
import { orderStatusRouter } from './orderStatus/orderStatus.routes';
import { statusCatalogRouter } from './statusCatalog/statusCatalog.routes';
import { restaurantRouter } from './restaurant/restaurant.route';
import { stateRouter } from './state/state.route';
import { categoryRouter } from './category/category.route';
import { menuItemRouter } from './menu_item/menu_item.route';
import { orderMenuItemRouter } from './order_menu_item/order_menu_item.route';
import { commentRouter } from './comment/comment.route';
import { authRouter } from './auth/auth.route';

dotenv.config();

const app: Application = express();

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//default route
app.get('/', (req, res:Response) => {
  res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL");
});


//import route

const PORT = process.env.PORT || 5000;
app.use('/api',cityRouter);
app.use('/api',userRouter);
app.use("/api", restaurantOwnerRouter);
app.use("/api", driverRouter);
app.use("/api", addressRouter);
app.use('/api', ordersRouter);
app.use('/api',orderStatusRouter);
app.use('/api',statusCatalogRouter);
app.use('/api', restaurantRouter);
app.use('/api', stateRouter);
app.use('/api', categoryRouter);
app.use('/api', menuItemRouter);
app.use('/api', orderMenuItemRouter);
app.use('/api', commentRouter);
app.use('/api', authRouter);


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
 });
  