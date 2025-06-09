import express, { Application,Response } from 'express';
import dotenv from 'dotenv';
import { cityRouter } from './city/city.route';
import { driverRouter } from './driver/driver.routes';
import { addressRouter } from './address/address.routes';
import { stateRouter } from './state/state.route';
import { commentRouter } from './comment/comment.route';
import { orderStatusRouter } from './orderStatus/orderStatus.route';
import { statusCatalogRouter } from './statusCatalog/statusCatalog.route';
import { ordersRouter } from './order/order.route';
import { categoryRouter } from './category/category.route';
import { restaurantRouter } from './Restaurant/restaurant.route';
import { orderMenuItemRouter } from './orderMenuItem/orderMenuItem.route';
import { menuItemRouter } from './menu_items.ts/menu_item.route';
import { userRouter } from './user/user.router';
import { logger } from './middleware/logger';
import { rateLimiterMiddleware } from './middleware/rateLimiter';
import { authRouter } from './auth/auth.route';
import { restaurantOwnerRouter } from './restaurant_owner/restaurantOwner.route';

dotenv.config();

const app: Application = express();

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiterMiddleware);

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
  