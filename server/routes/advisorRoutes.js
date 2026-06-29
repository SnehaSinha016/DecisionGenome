import express from "express";
import { advisor } from "../controllers/advisorController.js";

const router = express.Router();

router.post("/", advisor);

export default router;