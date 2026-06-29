export const buildOrganizationalIntelligence = (recommendations) => {

    const intelligence = {

        summary: {

            totalSimilarDecisions: recommendations.length,

            dominantDepartment: null,

            dominantBusinessDomain: null,

            mostCommonPriority: null,

            mostCommonCategory: null,

            averageSimilarity: 0

        },

        topRisks: [],

        topOutcomes: [],

        topTags: []

    };

    const departmentCount = {};
    const domainCount = {};
    const priorityCount = {};
    const categoryCount = {};
    const riskCount = {};
    const outcomeCount = {};
    const tagCount = {};

    let similaritySum = 0;

    recommendations.forEach((decision) => {

        similaritySum += parseInt(decision.similarity);

        departmentCount[decision.department] =
            (departmentCount[decision.department] || 0) + 1;

        domainCount[decision.businessDomain] =
            (domainCount[decision.businessDomain] || 0) + 1;

        priorityCount[decision.priority] =
            (priorityCount[decision.priority] || 0) + 1;

        categoryCount[decision.decisionCategory] =
            (categoryCount[decision.decisionCategory] || 0) + 1;

        if (decision.risk && decision.risk !== "") {

            riskCount[decision.risk] =
                (riskCount[decision.risk] || 0) + 1;

        }

        if (decision.expectedOutcome && decision.expectedOutcome !== "") {

            outcomeCount[decision.expectedOutcome] =
                (outcomeCount[decision.expectedOutcome] || 0) + 1;

        }

        (decision.tags || []).forEach(tag => {

            tagCount[tag] =
                (tagCount[tag] || 0) + 1;

        });

    });

    const getTop = (obj) => {

        if (Object.keys(obj).length === 0)
            return null;

        return Object.entries(obj)
            .sort((a, b) => b[1] - a[1])[0][0];

    };

    intelligence.summary.dominantDepartment =
        getTop(departmentCount);

    intelligence.summary.dominantBusinessDomain =
        getTop(domainCount);

    intelligence.summary.mostCommonPriority =
        getTop(priorityCount);

    intelligence.summary.mostCommonCategory =
        getTop(categoryCount);

    intelligence.summary.averageSimilarity =
        Math.round(similaritySum / recommendations.length);

    intelligence.topRisks =
        Object.entries(riskCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([risk]) => risk);

    intelligence.topOutcomes =
        Object.entries(outcomeCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([outcome]) => outcome);

    intelligence.topTags =
        Object.entries(tagCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([tag]) => tag);

    return intelligence;

};