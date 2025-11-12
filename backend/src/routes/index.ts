import express from "express";
import menuRoute from "./menu.routes.js";
import userRouter from "./user.routes.js";
import orderRoute from "./order.routes.js";


const mainRouter = express.Router();

mainRouter.use("/menu", menuRoute);
mainRouter.use("/user", userRouter);
mainRouter.use("/order",orderRoute)

export default mainRouter;
