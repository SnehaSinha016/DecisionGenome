function classify(score) {

    if (score >= 85)
        return "Strategically Related";

    if (score >= 70)
        return "Strong Relationship";

    if (score >= 50)
        return "Moderately Related";

    if (score >= 30)
        return "Weakly Related";

    return "Unrelated";

}

function confidence(scores) {

    const avg =
        scores.reduce((a, b) => a + b, 0) /
        scores.length;

    const variance =
        scores.reduce(

            (sum, score) =>

                sum +

                Math.pow(score - avg, 2),

            0

        ) / scores.length;

    return Math.max(

        60,

        Math.round(

            100 -

            Math.sqrt(variance)

        )

    );

}

export function aggregateEvidence(

    metadata,

    graph,

    semantic

) {

    const overall = Math.round(

        metadata.score * 0.35 +

        graph.score * 0.25 +

        semantic.score * 0.40

    );

    return {

        overallScore: overall,

        confidence: confidence([

            metadata.score,

            graph.score,

            semantic.score

        ]),

        relationshipType:

            classify(overall),

        reasons: [

            ...metadata.reasons,

            ...graph.reasons,

            ...semantic.reasons

        ]

    };

}