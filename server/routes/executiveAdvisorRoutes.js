import express from "express";

import {
    executiveAdvisor
} from "../controllers/executiveAdvisorController.js";

const router = express.Router();

router.post(
    "/executive-advisor",
    executiveAdvisor
);

export default router;