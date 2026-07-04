import axios from "axios";

const API = axios.create({
    baseURL: "https://decisiongenome-1.onrender.com/api/graph",
});

export const getGraphIntelligence = async () => {
    const { data } = await API.get("/intelligence");
    return data;
};

export const getGraphInsights = async () => {
    const { data } = await API.get("/insights");
    return data;
};

export const getDecisionImpact = async (decisionId) => {
    const { data } = await API.get(`/impact/${decisionId}`);
    return data;
};
export const calculateInfluence = async () => {

    const [nodes, edges] = await Promise.all([

        Node.find().lean(),

        Edge.find().lean()

    ]);

    const degree = {};

    nodes.forEach(node => {

        degree[node.id] = 0;

    });

    edges.forEach(edge => {

        degree[edge.source]++;

        degree[edge.target]++;

    });

    const stakeholderInfluence = [];

    const departmentInfluence = [];

    const decisionInfluence = [];

    nodes.forEach(node => {

        const score = degree[node.id];

        const item = {

            id: node.id,

            label: node.label,

            influence: score

        };

        if (node.type === "Stakeholder") {

            stakeholderInfluence.push(item);

        }

        if (node.type === "Department") {

            departmentInfluence.push(item);

        }

        if (node.type === "Decision") {

            decisionInfluence.push(item);

        }

    });

    stakeholderInfluence.sort(

        (a, b) => b.influence - a.influence

    );

    departmentInfluence.sort(

        (a, b) => b.influence - a.influence

    );

    decisionInfluence.sort(

        (a, b) => b.influence - a.influence

    );

    return {

        topStakeholders:

            stakeholderInfluence.slice(0, 10),

        topDepartments:

            departmentInfluence.slice(0, 10),

        topDecisions:

            decisionInfluence.slice(0, 10)

    };

};