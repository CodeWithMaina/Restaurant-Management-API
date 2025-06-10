import { Request, Response, RequestHandler } from "express";
import {
  createUserServices,
  getUserByEmailService,
  updateUserPasswordService,
} from "./auth.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendNotificationEmail } from "../middleware/googleMailer";
import { getUserByIdServices } from "../user/user.service";
import { createUserSchema, loginSchema } from "../validations/auth.validator";
import { z } from "zod";

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = createUserSchema.parse(req.body);
    const userEmail = validatedData.email;

    const existingUser = await getUserByEmailService(userEmail);
    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    // Genereate hashed password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(validatedData.password, salt);
    validatedData.password = hashedPassword;

    // Call the service to create the user
    const newUser = await createUserServices(validatedData);
    const results = await sendNotificationEmail(
      validatedData.email,
      validatedData.name,
      "Account created successfully",
      "Welcome to our food service</b>"
    );
    if (!results) {
      res.status(500).json({ error: "Failed to send notification email" });
      return;
    } else {
      console.log("Email sent successfully:", results);
    }
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: error.message || "Failed to create user" });
  }
};

//Login User
export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await getUserByEmailService(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Compare passwords
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    //Generate a token
    let payload = {
      userId: user.id,
      email: user.email,
      userType: user.userType,
      //expiresIn: "1h" // Optional: Set token expiration
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
    };

    let secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret);

    res
      .status(200)
      .json({
        token,
        userId: user.id,
        email: user.email,
        userType: user.userType,
      });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: error.message || "Failed to login user" });
  }
};

export const passwordReset: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const user = await getUserByEmailService(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const resetToken = jwt.sign(
      { userId: user.id, email: user.email }, // Include email for verification
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Generated reset token:", resetToken); // Debug log

    const resetLink = `http://localhost:5000/api/reset/${resetToken}`;
    const emailResult = await sendNotificationEmail(
      email,
      "Password Reset",
      user.name,
      `Click the link to reset your password: <a href="${resetLink}">Reset Password</a>`
    );

    if (!emailResult) {
      console.error("Failed to send reset email");
      res.status(500).json({ error: "Failed to send reset email" });
      return;
    }

    console.log("Password reset email sent successfully to:", email);
    res.status(200).json({ 
      message: "Password reset email sent successfully",
      token: resetToken // For testing, remove in production
    });

  } catch (error: any) {
    console.error("Password reset error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to reset password" 
    });
  }
};

export const updatePassword: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const { email } = req.body;

    if (!token) {
      res.status(400).json({ error: "Token is required" });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    const secret = process.env.JWT_SECRET as string;
    const payload: any = jwt.verify(token, secret);

    // Fetch user by ID from token
    const user = await getUserByIdServices(payload.userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Now use the user's email from DB
    await updateUserPasswordService(user.email, hashedPassword);

    // Send reset email (you can implement this function)
    const results = await sendNotificationEmail(
      email,
      "Password Reset",
      user.name,
      "PassWord Reset Successfully"
    );
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Invalid or expired token" });
  }
};