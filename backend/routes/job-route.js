import express from "express";
import { getApplicationDetails, submitJobApplication } from "../controllers/job-controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post('/submit',verifyToken,submitJobApplication);
router.get('/',getApplicationDetails)

export default router;