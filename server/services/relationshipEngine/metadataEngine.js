function calculateOverlap(listA = [], listB = []) {

    if (listA.length === 0 || listB.length === 0) {

        return 0;

    }

    const setA = new Set(

        listA.map(item => item.label)

    );

    const setB = new Set(

        listB.map(item => item.label)

    );

    let common = 0;

    setA.forEach(value => {

        if (setB.has(value)) {

            common++;

        }

    });

    return common / Math.max(setA.size, setB.size);

}

export function metadataSimilarity(A, B) {

    const weights = {

        department: 0.25,

        businessDomain: 0.20,

        stakeholders: 0.20,

        tags: 0.15,

        risks: 0.10,

        outcomes: 0.05,

        priority: 0.03,

        category: 0.02

    };

    let score = 0;

    const reasons = [];

    // Department

    if (

        A.department &&
        B.department &&
        A.department.label === B.department.label

    ) {

        score += weights.department;

        reasons.push(

            `Same Department (${A.department.label})`

        );

    }

    // Business Domain

    if (

        A.businessDomain &&
        B.businessDomain &&
        A.businessDomain.label === B.businessDomain.label

    ) {

        score += weights.businessDomain;

        reasons.push(

            `Same Business Domain (${A.businessDomain.label})`

        );

    }

    // Stakeholders

    const stakeholderScore = calculateOverlap(

        A.stakeholders,

        B.stakeholders

    );

    if (stakeholderScore > 0) {

        score += stakeholderScore * weights.stakeholders;

        reasons.push("Shared Stakeholders");

    }

    // Tags

    const tagScore = calculateOverlap(

        A.tags,

        B.tags

    );

    if (tagScore > 0) {

        score += tagScore * weights.tags;

        reasons.push("Shared Tags");

    }

    // Risks

    const riskScore = calculateOverlap(

        A.risks,

        B.risks

    );

    if (riskScore > 0) {

        score += riskScore * weights.risks;

        reasons.push("Shared Risks");

    }

    // Outcomes

    const outcomeScore = calculateOverlap(

        A.outcomes,

        B.outcomes

    );

    if (outcomeScore > 0) {

        score += outcomeScore * weights.outcomes;

        reasons.push("Shared Outcomes");

    }

    // Priority

    if (

        A.priority &&
        B.priority &&
        A.priority.label === B.priority.label

    ) {

        score += weights.priority;

        reasons.push("Same Priority");

    }

    // Category

    if (

        A.category &&
        B.category &&
        A.category.label === B.category.label

    ) {

        score += weights.category;

        reasons.push("Same Category");

    }

    return {

        score: Math.round(score * 100),

        reasons

    };

}