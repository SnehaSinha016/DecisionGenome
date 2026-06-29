import express from "express";

import { getDecisionRelationships } from "../controllers/relationshipController.js";

const router = express.Router();

router.get(
    "/relationships",
    getDecisionRelationships
);

export default router;