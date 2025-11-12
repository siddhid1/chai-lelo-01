import express from "express";
import { createUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/createUser",createUser);

// POST => endpoint to verify the user using phone number otp

// GET => user/orders to get users order 

// GET =>  profile 


export default userRouter;
