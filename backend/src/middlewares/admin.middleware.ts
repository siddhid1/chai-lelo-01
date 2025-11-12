import express, { type NextFunction, type Request, type Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";

const adminMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      msg: "invalid token",
    });
  }

  const token = authHeader.split("")[1] || "";

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "invalid user" });
  }
};

export default adminMiddleware;