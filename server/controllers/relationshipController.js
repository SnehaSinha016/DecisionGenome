import { buildDecisionGraph } from "../services/decisionGraphBuilder.js";
import { buildDecisionRelationships } from "../services/decisionRelationshipBuilder.js";

export const getDecisionRelationships = async (req, res) => {

    try {

        const decisionViews = await buildDecisionGraph();

        const relationships = buildDecisionRelationships(decisionViews);

        return res.json({

            success: true,

            count: relationships.length,

            relationships

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};