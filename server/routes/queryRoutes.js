import express from "express";

import { searchQuery } from "../controllers/queryController.js";

const router = express.Router();

router.post("/", searchQuery);

export default router;