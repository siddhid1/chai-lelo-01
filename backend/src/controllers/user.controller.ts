import express, { type Request, type Response } from "express";
import { User } from "../models/user.model.js";

/**
 * @desc Create a new user (check duplicate email)
 * @route POST /api/user/create
 * @access Public
 */

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, userAddress } = req.body;

    // Step 1: Validate required fields
    if (!email) {
      return res
        .status(400)
        .json({ error: "Both userId and email are required fields." });
    }

    // Step 2: Check for existing user by email
    const existingUser01 = await User.findOne({ email });
    if (existingUser01) {
      return res.status(409).json({
        message: "A user with this email already exists.",
        user: existingUser01.firstName,
      });
    }
    const existingUser02 = await User.findOne({ phone });
    if (existingUser02) {
      return res.status(409).json({
        message: "A user with this email already exists.",
        user: existingUser02.firstName,
      });
    }

    // Step 3: Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      userAddress,
      isVerified: false,
    });

    // Step 4: Return success response
    return res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
