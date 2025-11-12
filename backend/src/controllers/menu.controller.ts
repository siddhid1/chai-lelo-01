import type { Request, Response } from "express";
import mongoose from "mongoose";
import { MenuItem } from "../models/menuItem.model.js";
import shortUUID from "short-uuid";

//GET /api/v1/menu/:slot
//Fetching Menu

export const getMenuBySlot = async (req: Request, res: Response) => {
  try {
    const { slot } = req.params;
    const normalizedSlot = slot?.toLowerCase();

    const items = await MenuItem.find({
      slot: normalizedSlot,
      available: true,
    });
    console.log(items);
    res.status(200).json({ items });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch menu",
      details: error.message,
    });
  }
};

// POST api/v1/menu/:slot
//Adding new item to a slot

export const addItemBySlot = async (req: Request, res: Response) => {
  try {
    const { slot } = req.params;
    const normalizedSlot = slot?.toLowerCase();
    console.log(normalizedSlot);

    //generating a uuid

    const uuid = shortUUID.generate();
    const generateShortUUID = `${normalizedSlot}_${uuid.slice(0, 4)}`;

    //db model for food
    const newItem = await MenuItem.create({
      // name: req.body.name,
      // description: req.body.description,
      // price: req.body.price,
      // veg: req.body.veg,
      // available: req.body.available,
      ...req.body,
      menuId: generateShortUUID,
      slot: normalizedSlot,
    });

    res.status(201).json({
      message: "Item Added",
      item: newItem,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to add item", details: error.message });
  }
};

// PATCH /api/v1/menu/:id
// Updating an existing menu item by ID

export const updateMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { available, price, description } = req.body;

    // Dynamic update object - includes only provided fields
    const updates: {
      available?: boolean;
      price?: number;
      description?: string;
    } = {};
    if (available !== undefined) updates.available = available;
    if (price !== undefined) updates.price = price;
    if (description !== undefined) updates.description = description;

    // Validate updates
    const allowedUpdates = ["available", "price", "description"];
    const isValidOperation = Object.keys(updates).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates" });
    }

    // Find and update the item
    const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, {
      new: true, // to make sure we return the new doc
      runValidators: true, //to make sure that invalid values arent put in the fields
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      item: updatedItem,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to update menu item", details: error.message });
  }
};
