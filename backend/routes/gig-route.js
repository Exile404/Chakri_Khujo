import express from "express";
import {
  intent,
  deleteGig,
  getGig,
  getGigs,
  confirm
} from "../controllers/gig-controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

router.post("/create-payment-intent/:id", verifyToken, intent);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.put("/confirm", verifyToken, confirm);

export default router;