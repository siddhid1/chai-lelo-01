import express from "express";
import {
  getMenuBySlot,
  addItemBySlot,
  updateMenuItemById,
} from "../controllers/menu.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const menuRoute = express.Router();

menuRoute.get("/:slot", getMenuBySlot);

menuRoute.post("/:slot", addItemBySlot);

menuRoute.patch("/:slot/:id", updateMenuItemById);

//WITH MIDDLEWARES
// menuRoute.post("/:slot",adminMiddleware,addItemBySlot);
// menuRoute.patch("/:slot/:id",adminMiddleware,updateMenuItemById);

export default menuRoute;
