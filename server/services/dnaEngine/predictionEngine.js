export function generateDecisionDNA(decisionView) {

    const dna = {

        innovation: 0,

        risk: 0,

        strategicImpact: 0,

        organizationalReach: 0,

        executionComplexity: 0,

        stakeholderInfluence: 0

    };

    // Innovation

    dna.innovation = Math.min(

        100,

        decisionView.tags.length * 15 +

        decisionView.outcomes.length * 10

    );

    // Risk

    dna.risk = Math.min(

        100,

        decisionView.risks.length * 25

    );

    // Strategic Impact

    dna.strategicImpact =

        decisionView.impact?.label === "High"

            ? 95

            : decisionView.impact?.label === "Medium"

            ? 65

            : 35;

    // Organization Reach

    let reach = 0;

    if (decisionView.department) reach++;

    if (decisionView.businessDomain) reach++;

    reach += decisionView.stakeholders.length;

    dna.organizationalReach = Math.min(

        100,

        reach * 20

    );

    // Execution Complexity

    dna.executionComplexity = Math.min(

        100,

        decisionView.reasons.length * 20 +

        decisionView.risks.length * 10

    );

    // Stakeholder Influence

    dna.stakeholderInfluence = Math.min(

        100,

        decisionView.stakeholders.length * 25

    );

    return dna;

}