import express from "express";

import { getDecisionGraph } from "../controllers/decisionGraphController.js";

const router = express.Router();

router.get("/decision-view", getDecisionGraph);

export default router;