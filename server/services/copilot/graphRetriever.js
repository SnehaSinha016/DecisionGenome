import Node from "../../models/Node.js";
import Edge from "../../models/Edge.js";

export async function retrieveRelevantGraph(question, intent) {

    const nodes = await Node.find().lean();

    const edges = await Edge.find().lean();

    const q = question.toLowerCase();

    const relevantNodes = nodes.filter(node => {

        return (

            node.label?.toLowerCase().includes(q) ||

            node.type?.toLowerCase().includes(q)

        );

    });

    const relevantIds = new Set(

        relevantNodes.map(n => n.id)

    );

    const relevantEdges = edges.filter(edge =>

        relevantIds.has(edge.source) ||

        relevantIds.has(edge.target)

    );

    return {

        nodes: relevantNodes,

        edges: relevantEdges

    };

}