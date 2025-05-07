// src/controllers/authController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getEnv } from "../utils/config";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try { 
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password."});
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password."});;
    }
    else {
      const secret = getEnv("JWT_SECRET"); // Get secret from environment variables

      const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email }, // Payload
        secret, // secret key from environment variables
        { expiresIn: "1d" } // Token expiration time  
      );

      return res.status(200).json({ 
        token,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email
        }
      });
    }

  }
  catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};