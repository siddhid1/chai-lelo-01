import express, { type Request, type Response } from "express";
import { User } from "../models/user.model.js";
import { MenuItem } from "../models/menuItem.model.js";
import { Order } from "../models/order.model.js";


// POST : /api/v1/order/createOrder/

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { slot } = req.params;
    const normalizedSlot = slot?.toLowerCase();
    console.log(normalizedSlot);

    const { phone, items } = req.body;

    //Step-1 : Validate input
    
    if (!phone || !Array.isArray(items) || items.length == 0) {
      return res.status(400).json({ error: "Missing requred fields" });
    }
    console.log("step1")
    //Step-2 : Validate user via phone
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (!user.isVerified)
      return res.status(400).json({ error: "User is not verified" });

    console.log("step2")
    //step-3 : Bill Calculation
    let totalBill = 0;
    const validItems = [];
    console.log("iterating over items")
    for (const i of items) {
      const food = await MenuItem.findOne({menuId:i.item.menuId});
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
        itemName : food.name,
        item: food._id,
        quantity: i.quantity,
      });
    }
    console.log("order created")
    console.log(`${user}`)
    const order = await Order.create({
      userName:user , 
      userFirstName: user.firstName,
      phone,
      orderedItems: validItems,
      slot: normalizedSlot,
      totalBill,
    });
    console.log("step3")
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
