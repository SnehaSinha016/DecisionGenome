import { getSubgraph } from "../services/graphTraversal.js";

export const exploreGraph = async (req, res) => {

    try {

        const { nodeId } = req.params;

        const depth = parseInt(req.query.depth) || 2;

        const graph = await getSubgraph(nodeId, depth);

        return res.status(200).json({

            success: true,

            nodes: graph.nodes,

            edges: graph.edges,

            traversalOrder: graph.traversalOrder,

            statistics: graph.statistics

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