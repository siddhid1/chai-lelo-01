import express, { type Request, type Response } from "express";
import { User } from "../models/user.model.js";
import { MenuItem } from "../models/menuItem.model.js";
import { Order } from "../models/order.model.js";
import { validate } from "uuid";

// POST : /api/v1/order/createOrder/slot:

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { slot } = req.params;
    const normalizedSlot = slot?.toLowerCase();
    console.log(normalizedSlot);

    const { phone, items, location } = req.body;

    //Step-1 : Validate input
    if (!phone || !Array.isArray(items) || items.length == 0 || !location) {
      return res.status(400).json({ error: "Missing requred fields" });
    }

    //Step-2 : Validate user via phone
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.isVerified)
      return res.status(400).json({ error: "User is not verified" });

    //step-3 : Bill Calculation
    let totalBill = 0;
    const validItems = [];

    for (const i of items) {
      const food = await MenuItem.findById(i.item.menuId);
      if (!food || !food.available) {
        return res
          .status(400)
          .json({ error: `Food item unavailable ${i.item.menuId}` });
      }

      if (food.price != null) {
        //price from BE
        totalBill += food.price * i.quantity;
      } else {
        return res
          .status(400)
          .json({ error: `Invalid price for food item ${i.item.menuId}` });
      }
      validItems.push({
        menuItem: food._id,
        quantity: i.quantity,
      });
    }

    const order = await Order.create({
      userName: user.firstName,
      phone,
      items: validItems,
      location,
      slot: normalizedSlot,
      totalBill,
    });
    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error: any) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Failed to place order", details: error.message });
  }
};
