import express from "express";

import { exploreGraph } from "../controllers/graphTraversalController.js";

const router = express.Router();

router.get(

    "/explore/:nodeId",

    exploreGraph

);

export default router;