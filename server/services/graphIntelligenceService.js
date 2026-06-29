import Node from "../models/Node.js";
import Edge from "../models/Edge.js";


export const graphIntelligence = async () => {

    const [nodes, edges] = await Promise.all([

        Node.find().lean(),

        Edge.find().lean()

    ]);

    const nodeTypeCount = {};
    const connectionCount = {};
    const departmentCount = {};
    const tagCount = {};
    const riskCount = {};

    // Count node types
    nodes.forEach((node) => {

        nodeTypeCount[node.type] =
            (nodeTypeCount[node.type] || 0) + 1;

        connectionCount[node.id] = 0;

    });

    // Count node degree
    edges.forEach((edge) => {

        connectionCount[edge.source] =
            (connectionCount[edge.source] || 0) + 1;

        connectionCount[edge.target] =
            (connectionCount[edge.target] || 0) + 1;

    });

    // Build statistics
    nodes.forEach((node) => {

        if (node.type === "Department") {

            departmentCount[node.label] =
                connectionCount[node.id];

        }

        if (node.type === "Tag") {

            tagCount[node.label] =
                connectionCount[node.id];

        }

        if (node.type === "Risk") {

            riskCount[node.label] =
                connectionCount[node.id];

        }

    });

    const top = (obj, limit = 5) =>

        Object.entries(obj)

            .sort((a, b) => b[1] - a[1])

            .slice(0, limit)

            .map(([label, connections]) => ({

                label,

                connections

            }));

    return {

        overview: {

            totalNodes: nodes.length,

            totalEdges: edges.length,

            graphDensity:

                Number(

                    (edges.length / nodes.length).toFixed(2)

                )

        },

        nodeTypes: nodeTypeCount,

        topDepartments: top(departmentCount),

        topTags: top(tagCount),

        topRisks: top(riskCount),

        mostConnectedNodes:

            nodes

                .map((node) => ({

                    label: node.label,

                    type: node.type,

                    connections:

                        connectionCount[node.id]

                }))

                .sort(

                    (a, b) =>

                        b.connections - a.connections

                )

                .slice(0, 10)

    };

};
export const calculateDecisionImpact = async (decisionId) => {
    const [nodes, edges] = await Promise.all([
        Node.find().lean(),
        Edge.find().lean()
    ]);

    // Find the selected decision
    const startNode = nodes.find(
        node => String(node.id) === String(decisionId)
    );

    if (!startNode) {
        throw new Error("Decision not found");
    }

    // Build adjacency list
    const graph = {};

    edges.forEach(edge => {

        if (!graph[edge.source]) graph[edge.source] = [];
        if (!graph[edge.target]) graph[edge.target] = [];

        graph[edge.source].push(edge.target);
        graph[edge.target].push(edge.source);

    });

    // BFS Traversal
    const visited = new Set();
    const queue = [startNode.id];

    while (queue.length) {

        const current = queue.shift();

        if (visited.has(current)) continue;

        visited.add(current);

        (graph[current] || []).forEach(neighbour => {

            if (!visited.has(neighbour)) {

                queue.push(neighbour);

            }

        });

    }

    // Collect affected nodes
    const affectedNodes = nodes.filter(node =>
        visited.has(node.id)
    );

    // Group by type
    const grouped = {};

    affectedNodes.forEach(node => {

        if (!grouped[node.type]) {

            grouped[node.type] = [];

        }

        grouped[node.type].push(node.label);

    });

    // Calculate Impact Score
    const impactScore = Math.min(
        100,
        affectedNodes.length * 8
    );

    // Calculate Metrics
const totalConnections = affectedNodes.length;

const stakeholderCount =
    grouped.Stakeholder?.length || 0;

const riskCount =
    grouped.Risk?.length || 0;

const priority =
    grouped.Priority?.[0] || "Unknown";

return {

    decision: startNode.label,

    scores: {

        overall: impactScore

    },

    metrics: {

        totalConnections,

        stakeholders: stakeholderCount,

        risks: riskCount,

        priority

    },

    affectedByType: grouped,

    affectedNodes

};

};
export const generateGraphInsights = async () => {

    const [nodes, edges] = await Promise.all([
        Node.find().lean(),
        Edge.find().lean()
    ]);

    // Count connections for every node
    const connectionCount = {};

    nodes.forEach(node => {
        connectionCount[node.id] = 0;
    });

    edges.forEach(edge => {
        connectionCount[edge.source] =
            (connectionCount[edge.source] || 0) + 1;

        connectionCount[edge.target] =
            (connectionCount[edge.target] || 0) + 1;
    });

    // Most connected node
    const mostConnected = nodes
        .map(node => ({
            ...node,
            connections: connectionCount[node.id] || 0
        }))
        .sort((a, b) => b.connections - a.connections)[0];

    // Department with highest connectivity
    const topDepartment = nodes
        .filter(node => node.type === "Department")
        .map(node => ({
            ...node,
            connections: connectionCount[node.id] || 0
        }))
        .sort((a, b) => b.connections - a.connections)[0];

    // Highest connected Risk
    const topRisk = nodes
        .filter(node => node.type === "Risk")
        .map(node => ({
            ...node,
            connections: connectionCount[node.id] || 0
        }))
        .sort((a, b) => b.connections - a.connections)[0];

    // Highest connected Project
    const topProject = nodes
        .filter(node => node.type === "Project")
        .map(node => ({
            ...node,
            connections: connectionCount[node.id] || 0
        }))
        .sort((a, b) => b.connections - a.connections)[0];

    const insights = [];

    if (mostConnected) {
        insights.push({
            title: "Most Connected Node",
            description: `${mostConnected.label} has ${mostConnected.connections} connections.`,
            severity: "high"
        });
    }

    if (topDepartment) {
        insights.push({
            title: "Most Influential Department",
            description: `${topDepartment.label} interacts with ${topDepartment.connections} connected entities.`,
            severity: "medium"
        });
    }

    if (topRisk) {
        insights.push({
            title: "Highest Connected Risk",
            description: `${topRisk.label} affects ${topRisk.connections} connected entities.`,
            severity: "high"
        });
    }

    if (topProject) {
        insights.push({
            title: "Critical Project",
            description: `${topProject.label} has ${topProject.connections} dependencies.`,
            severity: "medium"
        });
    }

    insights.push({
        title: "Graph Health",
        description: `${nodes.length} enterprise entities are connected through ${edges.length} relationships.`,
        severity: "info"
    });

    return {
        insights
    };
};