import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

export const queryEngine = async (query) => {

    const search = query.trim().toLowerCase();

    // Step 1: Find matching nodes
    const matchedNodes = await Node.find({
        label: {
            $regex: search,
            $options: "i"
        }
    });

    if (matchedNodes.length === 0) {
        return {
            matchedNodes: [],
            relatedNodes: [],
            edges: []
        };
    }

    // Step 2: Get all connected edges
    const nodeIds = matchedNodes.map(node => node.id);

    const edges = await Edge.find({
        $or: [
            { source: { $in: nodeIds } },
            { target: { $in: nodeIds } }
        ]
    });

    // Step 3: Collect connected node IDs
    const connectedIds = new Set();

    edges.forEach(edge => {

        connectedIds.add(edge.source);
        connectedIds.add(edge.target);

    });

    // Step 4: Load connected nodes
    const relatedNodes = await Node.find({
        id: {
            $in: [...connectedIds]
        }
    });

    return {

        matchedNodes,

        relatedNodes,

        edges

    };

};