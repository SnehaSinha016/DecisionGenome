import { buildDecisionGraph } from "./buildDecisionGraph.js";

export async function generateExecutiveAdvisor() {

    const graph = await buildDecisionGraph();

    if (graph.length === 0) {

        return {

            recommendation: "No organizational decisions found.",

            confidence: 0,

            impact: "Unknown",

            priority: "Unknown",

            summary: "Upload a document to begin enterprise analysis.",

            risks: [],

            departments: [],

            nextActions: []

        };

    }

    // ------------------------
    // High Impact Decisions
    // ------------------------

    const highImpact = graph.filter(

        d => d.impact?.label === "High"

    );

    const highPriority = graph.filter(

        d => d.priority?.label === "High"

    );

    const departments = [

        ...new Set(

            graph

                .map(d => d.department?.label)

                .filter(Boolean)

        )

    ];

    const risks = [

        ...new Set(

            graph.flatMap(

                d => d.risks.map(

                    r => r.label

                )

            )

        )

    ];

    return {

        recommendation:

            highImpact.length > 0

                ? `Prioritize ${highImpact.length} high-impact decisions.`

                : "Review pending organizational decisions.",

        confidence:

            Math.min(

                100,

                70 +

                highImpact.length * 5

            ),

        impact:

            highImpact.length > 3

                ? "High"

                : "Medium",

        priority:

            highPriority.length > 2

                ? "High"

                : "Medium",

        summary:

            `DecisionGenome analyzed ${graph.length} organizational decisions across ${departments.length} departments.`,

        risks,

        departments,

        nextActions: [

            "Review high-impact decisions",

            "Mitigate identified risks",

            "Coordinate cross-functional stakeholders"

        ]

    };

}