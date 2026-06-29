import Node from "../models/Node.js";
import Edge from "../models/Edge.js";

export const buildDecisionGraph = async () => {

    // Load everything once
    const nodes = await Node.find();
    const edges = await Edge.find();

    // Quick lookup
    const nodeMap = {};

    nodes.forEach(node => {

        nodeMap[node.id] = node;

    });

    // Only Decision nodes
    const decisionNodes = nodes.filter(

        node => node.type === "Decision"

    );

    const graph = [];

    for (const decision of decisionNodes) {

        const relatedEdges = edges.filter(

            edge =>
                edge.source === decision.id ||
                edge.target === decision.id

        );

        const decisionView = {

            decision,

            department: null,

            businessDomain: null,

            priority: null,

            impact: null,

            category: null,

            stakeholders: [],

            risks: [],

            reasons: [],

            outcomes: [],

            tags: []

        };

        relatedEdges.forEach(edge => {

            const relatedId =
                edge.source === decision.id
                    ? edge.target
                    : edge.source;

            const relatedNode = nodeMap[relatedId];

            if (!relatedNode) return;

            switch (relatedNode.type) {

                case "Department":
                    decisionView.department = relatedNode;
                    break;

                case "BusinessDomain":
                    decisionView.businessDomain = relatedNode;
                    break;

                case "Priority":
                    decisionView.priority = relatedNode;
                    break;

                case "Impact":
                    decisionView.impact = relatedNode;
                    break;

                case "Category":
                    decisionView.category = relatedNode;
                    break;

                case "Stakeholder":
                    decisionView.stakeholders.push(relatedNode);
                    break;

                case "Risk":
                    decisionView.risks.push(relatedNode);
                    break;

                case "Reason":
                    decisionView.reasons.push(relatedNode);
                    break;

                case "Outcome":
                    decisionView.outcomes.push(relatedNode);
                    break;

                case "Tag":
                    decisionView.tags.push(relatedNode);
                    break;

            }

        });

        graph.push(decisionView);

    }

    return graph;

};