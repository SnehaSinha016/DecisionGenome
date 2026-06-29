import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

export const exploreRelationships = async (type, value) => {

    // -------------------------
    // Find Center Node
    // -------------------------

    const centerNode = await Node.findOne({
        type: {
            $regex: `^${type}$`,
            $options: "i"
        },
        label: {
            $regex: `^${value}$`,
            $options: "i"
        }
    });

    if (!centerNode) {
        return null;
    }

    // -------------------------
    // Graph Containers
    // -------------------------

    const nodeMap = new Map();
    const edgeMap = new Map();

    nodeMap.set(centerNode.id, centerNode);

    // -------------------------
    // FIRST HOP
    // -------------------------

    const firstHopEdges = await Edge.find({
        $or: [
            { source: centerNode.id },
            { target: centerNode.id }
        ]
    });

    for (const edge of firstHopEdges) {

        edgeMap.set(edge._id.toString(), edge);

        const neighbourId =
            edge.source === centerNode.id
                ? edge.target
                : edge.source;

        const neighbour = await Node.findOne({
            id: neighbourId
        });

        if (neighbour) {

            nodeMap.set(neighbour.id, neighbour);

            // -------------------------
            // SECOND HOP
            // -------------------------

            const secondHopEdges = await Edge.find({

                $or: [
                    { source: neighbour.id },
                    { target: neighbour.id }
                ]

            });

            for (const edge2 of secondHopEdges) {

                edgeMap.set(edge2._id.toString(), edge2);

                const secondId =
                    edge2.source === neighbour.id
                        ? edge2.target
                        : edge2.source;

                const secondNode = await Node.findOne({

                    id: secondId

                });

                if (secondNode) {

                    nodeMap.set(secondNode.id, secondNode);

                }

            }

        }

    }

    // -------------------------
    // Summary
    // -------------------------

    return {

        centerNode,

        summary: {

            totalNodes: nodeMap.size,

            totalEdges: edgeMap.size,

            firstHopConnections: firstHopEdges.length

        },

        nodes: [...nodeMap.values()],

        edges: [...edgeMap.values()]

    };

};