import express from "express";
import { placeOrder } from "../controllers/order.controller.js";

const orderRoute = express.Router();

orderRoute.post("/createOrder/:slot",placeOrder); 

export default orderRoute ; 

