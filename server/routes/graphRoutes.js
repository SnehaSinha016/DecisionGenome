import express from "express";

import {

    getGraph,
    getDepartmentGraph,
    getStakeholderGraph,
    getDecisionGraph,
    getDecisionImpact,
    getGraphIntelligence,
    getGraphInsights

} from "../controllers/graphController.js";
const router = express.Router();

router.get("/", getGraph);

router.get("/department/:department", getDepartmentGraph);

router.get("/stakeholder/:stakeholder", getStakeholderGraph);

router.get("/decision/:id", getDecisionGraph);
router.get("/intelligence",getGraphIntelligence);
router.get("/impact/:id",getDecisionImpact);
router.get("/insights",getGraphInsights)

export default router;