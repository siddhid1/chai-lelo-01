import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { Jwt } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or number, depending on your JWT payload
      adminId?:string
    }
  }
  interface CustomJwtPayload extends JwtPayload {
    userId: string;
    adminId:string
  }
}