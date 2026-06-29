import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

export const getSubgraph = async (startNodeId, maxDepth = 2) => {

    const visitedNodes = new Set();
    const visitedEdges = new Set();

    const queue = [];

    queue.push({
        nodeId: startNodeId,
        depth: 0
    });

    while (queue.length > 0) {

        const { nodeId, depth } = queue.shift();

        if (visitedNodes.has(nodeId)) continue;

        visitedNodes.add(nodeId);

        if (depth >= maxDepth) continue;
const connectedEdges = await Edge.find({

    $or: [

        { source: nodeId },

        { target: nodeId }

    ]

});

        for (const edge of connectedEdges) {

        visitedEdges.add(edge._id);
            const neighbour = edge.source === nodeId
                ? edge.target
                : edge.source;

            if (!visitedNodes.has(neighbour)) {

                queue.push({

                    nodeId: neighbour,

                    depth: depth + 1

                });

            }

        }

    }

    const nodes = await Node.find({

        id: {

            $in: [...visitedNodes]

        }

    });

    const edges = await Edge.find({

        _id: {

            $in: [...visitedEdges]

        }

    });

    return {

        nodes,

        edges,
         statistics: {

        totalNodes: nodes.length,

        totalEdges: edges.length,

        traversalDepth: maxDepth

    }

    };

};