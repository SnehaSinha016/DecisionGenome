export const buildAdvisorContext = (recommendations) => {

    return recommendations.map((decision) => ({

        title: decision.title,

        department: decision.department,

        businessDomain: decision.businessDomain,

        priority: decision.priority,

        decisionCategory: decision.decisionCategory,

        expectedOutcome: decision.expectedOutcome,

        risk: decision.risk,

        tags: decision.tags,

        similarity: decision.similarity,

        matchedOn: decision.matchedOn

    }));

};