import express from "express";

import {

    getAnalytics

} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/:type", getAnalytics);

export default router;