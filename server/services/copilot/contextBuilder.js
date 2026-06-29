import Node from "../../models/Node.js";
import Edge from "../../models/Edge.js";

export async function buildEnterpriseContext(question, intent) {

    const nodes = await Node.find().lean();

    const edges = await Edge.find().lean();

    const decisions = nodes.filter(
        n => n.type === "Decision"
    );

    const departments = nodes.filter(
        n => n.type === "Department"
    );

    const stakeholders = nodes.filter(
        n => n.type === "Stakeholder"
    );

    const risks = nodes.filter(
        n => n.type === "Risk"
    );

    const tags = nodes.filter(
        n => n.type === "Tag"
    );

    const outcomes = nodes.filter(
        n => n.type === "Outcome"
    );

    const reasons = nodes.filter(
        n => n.type === "Reason"
    );


    const graphSummary = {

        totalNodes: nodes.length,

        totalEdges: edges.length,

        totalDecisions: decisions.length,

        totalDepartments: departments.length,

        totalStakeholders: stakeholders.length,

        totalRisks: risks.length

    };

const relevantDecisionData = decisions.slice(0, 5);

const relevantDepartmentData = departments.slice(0, 5);

const relevantStakeholderData = stakeholders.slice(0, 5);

const relevantRiskData = risks.slice(0, 5);

const relevantRelationships = edges.slice(0, 10);

const relevantNodes = [
    ...relevantDecisionData,
    ...relevantDepartmentData,
    ...relevantStakeholderData,
    ...relevantRiskData
]
.filter(node =>
    question
        .toLowerCase()
        .includes((node.label || "").toLowerCase())
)
.map(node => node.id);

   return {

    question,

    intent,

    decisions: relevantDecisionData,

    departments: relevantDepartmentData,

    stakeholders: relevantStakeholderData,

    risks: relevantRiskData,

    relationships: relevantRelationships,

    relevantNodes,

    graphSummary,

    timestamp: new Date().toISOString()
};
}
