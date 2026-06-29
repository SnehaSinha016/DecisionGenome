import { buildDecisionGraph } from "../services/decisionGraphBuilder.js";

export const getDecisionGraph = async (req, res) => {

    try {

        const graph = await buildDecisionGraph();

        return res.status(200).json({

            success: true,

            totalDecisions: graph.length,

            graph

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};