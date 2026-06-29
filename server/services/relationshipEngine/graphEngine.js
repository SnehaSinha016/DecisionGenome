function getNodeLabels(nodes = []) {

    return new Set(
        nodes.map(node => node.label)
    );

}

function calculateNeighborOverlap(setA, setB) {

    if (setA.size === 0 || setB.size === 0) {

        return 0;

    }

    let common = 0;

    setA.forEach(value => {

        if (setB.has(value)) {

            common++;

        }

    });

    return common / Math.max(setA.size, setB.size);

}

export function graphSimilarity(A, B) {

    const reasons = [];

    // -------------------------
    // Collect neighbouring nodes
    // -------------------------

    const neighborsA = [

        ...(A.tags || []),

        ...(A.stakeholders || []),

        ...(A.risks || []),

        ...(A.outcomes || []),

        ...(A.reasons || [])

    ];

    const neighborsB = [

        ...(B.tags || []),

        ...(B.stakeholders || []),

        ...(B.risks || []),

        ...(B.outcomes || []),

        ...(B.reasons || [])

    ];

    const setA = getNodeLabels(neighborsA);

    const setB = getNodeLabels(neighborsB);

    const overlap = calculateNeighborOverlap(setA, setB);

    if (overlap > 0) {

        reasons.push(

            `${Math.round(overlap * 100)}% shared graph neighbours`

        );

    }

    return {

        score: Math.round(overlap * 100),

        reasons

    };

}