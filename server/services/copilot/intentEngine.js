export function detectIntent(question) {

    const q = question.toLowerCase();

    if (
        q.includes("risk") ||
        q.includes("risky")
    ) {

        return "HIGH_RISK_DECISIONS";

    }

    if (
        q.includes("department")
    ) {

        return "LIST_DEPARTMENTS";

    }

    if (
        q.includes("stakeholder")
    ) {

        return "LIST_STAKEHOLDERS";

    }

    if (
        q.includes("similar")
    ) {

        return "SIMILAR_DECISIONS";

    }

    if (
        q.includes("impact")
    ) {

        return "IMPACT_ANALYSIS";

    }

    if (
        q.includes("summary")
    ) {

        return "ORGANIZATION_SUMMARY";

    }

    if (
        q.includes("recommend")
    ) {

        return "EXECUTIVE_RECOMMENDATION";

    }

    return "GENERAL";
}