import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { roleEnum } from "../drizzle/schema";


dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

type DecodedToken = {
  userId: number;
  email: string;
  userType: typeof roleEnum.enumValues[number];
  fullName: string;
  exp: number;
};

// AUTHENTICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
};

// AUTHORIZATION MIDDLEWARE
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
  requiredRoles: typeof roleEnum.enumValues[number] | "both"
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const decodedToken = await verifyToken(token, process.env.JWT_SECRET as string);
  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const userType = decodedToken.userType;

  // Check if user has required role
  if (
    requiredRoles === "both" &&
    (userType === "admin" || userType === "restaurant_owner" || userType === "driver" || userType === "customer")
  ) {
    req.user = decodedToken;
    return next();
  } else if (userType === requiredRoles) {
    req.user = decodedToken;
    return next();
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden: You do not have permission to access this resource" });
  }
};

// Role-specific middleware
export const adminRoleAuth = (req: Request, res: Response, next: NextFunction) =>
  authMiddleware(req, res, next, "admin");

export const driverRoleAuth = (req: Request, res: Response, next: NextFunction) =>
  authMiddleware(req, res, next, "driver");

export const customerRoleAuth = (req: Request, res: Response, next: NextFunction) =>
  authMiddleware(req, res, next, "customer");

export const restaurantOwnerRoleAuth = (req: Request, res: Response, next: NextFunction) =>
  authMiddleware(req, res, next, "restaurant_owner");

// Combined role middleware
export const staffRoleAuth = (req: Request, res: Response, next: NextFunction) =>
  authMiddleware(req, res, next, "both"); // For admin + restaurant_owner