import express from "express";

import {

    recommend

} from "../controllers/recommendationController.js";

const router = express.Router();

router.post("/", recommend);

export default router;