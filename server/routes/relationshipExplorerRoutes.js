import express from "express";

import {

    relationshipExplorer

} from "../controllers/relationshipExplorerController.js";

const router = express.Router();

router.get(

    "/explore/:type/:value",

    relationshipExplorer

);

export default router;