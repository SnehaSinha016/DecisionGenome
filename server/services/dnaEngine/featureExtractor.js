export function extractDecisionFeatures(decisionView) {

    return {

        // Identity
        id: decisionView.decision.id,
        title: decisionView.decision.label,

        // Metadata
        department:
            decisionView.department?.label ?? null,

        businessDomain:
            decisionView.businessDomain?.label ?? null,

        priority:
            decisionView.priority?.label ?? null,

        impact:
            decisionView.impact?.label ?? null,

        category:
            decisionView.category?.label ?? null,

        // Collections
        stakeholders:
            decisionView.stakeholders.map(x => x.label),

        tags:
            decisionView.tags.map(x => x.label),

        risks:
            decisionView.risks.map(x => x.label),

        outcomes:
            decisionView.outcomes.map(x => x.label),

        reasons:
            decisionView.reasons.map(x => x.label),

        // Counts
        stakeholderCount:
            decisionView.stakeholders.length,

        tagCount:
            decisionView.tags.length,

        riskCount:
            decisionView.risks.length,

        outcomeCount:
            decisionView.outcomes.length,

        reasonCount:
            decisionView.reasons.length

    };

}