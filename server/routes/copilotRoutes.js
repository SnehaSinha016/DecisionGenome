import express from "express";
import { askCopilot } from "../controllers/copilotController.js";

const router = express.Router();

router.post("/copilot", askCopilot);

export default router;