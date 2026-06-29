export function buildDecisionRelationships(decisionViews) {

    const relationships = [];

    for (let i = 0; i < decisionViews.length; i++) {

        for (let j = i + 1; j < decisionViews.length; j++) {

            const A = decisionViews[i];
            const B = decisionViews[j];

            const decisionA = A.decision.id;
            const decisionB = B.decision.id;

            if (
                A.department &&
                B.department &&
                A.department.label === B.department.label
            ) {

                relationships.push({

                    source: decisionA,

                    target: decisionB,

                    relation: "shares_department",

                    strength: 3

                });

            }


            if (
                A.businessDomain &&
                B.businessDomain &&
                A.businessDomain.label === B.businessDomain.label
            ) {

                relationships.push({

                    source: decisionA,

                    target: decisionB,

                    relation: "shares_business_domain",

                    strength: 2

                });

            }


            if (
                A.priority &&
                B.priority &&
                A.priority.label === B.priority.label
            ) {

                relationships.push({

                    source: decisionA,

                    target: decisionB,

                    relation: "shares_priority",

                    strength: 1

                });

            }


            if (
                A.category &&
                B.category &&
                A.category.label === B.category.label
            ) {

                relationships.push({

                    source: decisionA,

                    target: decisionB,

                    relation: "shares_category",

                    strength: 2

                });

            }


            A.tags.forEach(tagA => {

                B.tags.forEach(tagB => {

                    if (tagA.label === tagB.label) {

                        relationships.push({

                            source: decisionA,

                            target: decisionB,

                            relation: "shares_tag",

                            label: tagA.label,

                            strength: 1

                        });

                    }

                });

            });

            // -----------------------
            // Shared Stakeholders
            // -----------------------

            A.stakeholders.forEach(personA => {

                B.stakeholders.forEach(personB => {

                    if (personA.label === personB.label) {

                        relationships.push({

                            source: decisionA,

                            target: decisionB,

                            relation: "shares_stakeholder",

                            label: personA.label,

                            strength: 2

                        });

                    }

                });

            });

            // -----------------------
            // Shared Risks
            // -----------------------

            A.risks.forEach(riskA => {

                B.risks.forEach(riskB => {

                    if (riskA.label === riskB.label) {

                        relationships.push({

                            source: decisionA,

                            target: decisionB,

                            relation: "shares_risk",

                            label: riskA.label,

                            strength: 2

                        });

                    }

                });

            });

            // -----------------------
            // Shared Outcomes
            // -----------------------

            A.outcomes.forEach(outcomeA => {

                B.outcomes.forEach(outcomeB => {

                    if (outcomeA.label === outcomeB.label) {

                        relationships.push({

                            source: decisionA,

                            target: decisionB,

                            relation: "shares_outcome",

                            label: outcomeA.label,

                            strength: 2

                        });

                    }

                });

            });

        }

    }

    return relationships;

}