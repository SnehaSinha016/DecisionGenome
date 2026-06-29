export const buildPatterns = (recommendations) => {

    const patterns = {

        totalSimilarDecisions: recommendations.length,

        departments: {},

        businessDomains: {},

        priorities: {},

        categories: {},

        risks: {},

        outcomes: {},

        tags: {}

    };

    recommendations.forEach((decision) => {

        // Department

        patterns.departments[decision.department] =
            (patterns.departments[decision.department] || 0) + 1;

        // Business Domain

        patterns.businessDomains[decision.businessDomain] =
            (patterns.businessDomains[decision.businessDomain] || 0) + 1;

        // Priority

        patterns.priorities[decision.priority] =
            (patterns.priorities[decision.priority] || 0) + 1;

        // Category

        patterns.categories[decision.decisionCategory] =
            (patterns.categories[decision.decisionCategory] || 0) + 1;

        // Risks

        if (decision.risk) {

            patterns.risks[decision.risk] =
                (patterns.risks[decision.risk] || 0) + 1;

        }

        // Outcomes

        if (decision.expectedOutcome) {

            patterns.outcomes[decision.expectedOutcome] =
                (patterns.outcomes[decision.expectedOutcome] || 0) + 1;

        }

        // Tags

        (decision.tags || []).forEach(tag => {

            patterns.tags[tag] =
                (patterns.tags[tag] || 0) + 1;

        });

    });

    return patterns;

};