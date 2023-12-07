import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, JobInfo, confirm } from "../controllers/order-controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-post/:id", verifyToken, JobInfo);
router.put("/", verifyToken, confirm);

export default router;