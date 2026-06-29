import express from "express";
import { graphSearch } from "../controllers/graphSearchController.js";

const router = express.Router();

router.get("/search", graphSearch);

export default router;