import { buildKnowledgeGraph } from "./services/graphBuilder.js";

const decisions = [

    {

        title: "Approve AI Inventory",

        department: "Operations",

        stakeholders: [

            "CEO",

            "CTO"

        ],

        budget: "₹20 lakh",

        risk: "Low"

    }

];

const graph = buildKnowledgeGraph(decisions);

console.log(JSON.stringify(graph, null, 2));