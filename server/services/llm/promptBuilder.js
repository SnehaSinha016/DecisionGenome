export function buildPrompt({

    title,

    context,

    question

}) {

    return `

${title}

=============================

Enterprise Summary

- Total Nodes: ${context.graphSummary.totalNodes}
- Total Edges: ${context.graphSummary.totalEdges}
- Total Decisions: ${context.graphSummary.totalDecisions}
- Total Departments: ${context.graphSummary.totalDepartments}
- Total Stakeholders: ${context.graphSummary.totalStakeholders}
- Total Risks: ${context.graphSummary.totalRisks}

Relevant Decisions

${context.decisions
    .map(d => `- ${d.label}`)
    .join("\n")}

Relevant Departments

${context.departments
    .map(d => `- ${d.label}`)
    .join("\n")}

Relevant Risks

${context.risks
    .map(r => `- ${r.label}`)
    .join("\n")}

Question

${question}

Provide a concise executive-level response based only on the information above.

`;

}