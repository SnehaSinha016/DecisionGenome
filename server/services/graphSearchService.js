import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

export const searchGraph = async (query) => {

    console.log("\n========== GRAPH SEARCH ==========");

    console.log("Searching Query:", query);

    // Show all nodes for debugging
    const allNodes = await Node.find();

    console.log("\nAvailable Nodes:");

    allNodes.forEach((node) => {
        console.log(`${node.type} -> ${node.label}`);
    });

    console.log("===============================\n");

    // Case-insensitive search
    const node = await Node.findOne({

    label: {

        $regex: query,

        $options: "i"

    }

});

    console.log("Found Node:");
    console.log(node);

    if (!node) {
  return {

        searchNode: null,

        connectedNodes: {},

        highlightNodes: [],

        statistics: {

            totalConnections: 0

        }

    };

    }

    // Find all connected edges
    const edges = await Edge.find({

        $or: [

            { source: node.id },

            { target: node.id }

        ]

    });


    // Get connected node ids
    const connectedIds = edges.map((edge) =>

        edge.source === node.id
            ? edge.target
            : edge.source

    );

    // Load connected nodes
    const connectedNodes = await Node.find({

        id: {

            $in: connectedIds

        }

    });
    const groupedNodes = {};

connectedNodes.forEach((node) => {

    if (!groupedNodes[node.type]) {

        groupedNodes[node.type] = [];

    }

    groupedNodes[node.type].push({

        id: node.id,

        label: node.label

    });

});
const highlightNodes = [
    node.id,
    ...connectedNodes.map(n => n.id)
];

return {

    searchNode: {

        id: node.id,

        type: node.type,

        label: node.label

    },

    statistics: {

        totalConnections: connectedNodes.length

    },

    connectedNodes: groupedNodes,
    highlightNodes

};    

   

};