import Decision from "../models/Decision.js";

export const recommendDecisions = async (newDecision) => {

    const decisions = await Decision.find();

    const recommendations = decisions.map((decision) => {

        let score = 0;
        let matchedOn = [];

        if (
            decision.businessDomain &&
            decision.businessDomain === newDecision.businessDomain
        ) {
            score += 30;
            matchedOn.push("BusinessDomain");
        }

        if (
            decision.department &&
            decision.department === newDecision.department
        ) {
            score += 20;
            matchedOn.push("Department");
        }

        if (
            decision.decisionCategory &&
            decision.decisionCategory === newDecision.decisionCategory
        ) {
            score += 20;
            matchedOn.push("Category");
        }

        if (
            decision.priority &&
            decision.priority === newDecision.priority
        ) {
            score += 10;
            matchedOn.push("Priority");
        }

        const matchingTags = (decision.tags || []).filter(tag =>
            (newDecision.tags || []).includes(tag)
        );

        score += matchingTags.length * 5;

        if (matchingTags.length > 0) {
            matchedOn.push("Tags");
        }

        return {

            id: decision._id,

            title: decision.title,

            department: decision.department,

            businessDomain: decision.businessDomain,

            priority: decision.priority,

            decisionCategory: decision.decisionCategory,

            expectedOutcome: decision.expectedOutcome,

            risk: decision.risk,

            stakeholders: decision.stakeholders,

            tags: decision.tags,

            score,

            similarity: `${score}%`,

            matchedOn,

            matchingTags

        };

    });

    return recommendations
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

};