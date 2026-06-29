function tokenize(text = "") {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

}

function jaccardSimilarity(a, b) {

    const setA = new Set(a);
    const setB = new Set(b);

    const intersection = [...setA].filter(x => setB.has(x));

    const union = new Set([...setA, ...setB]);

    return intersection.length / union.size;

}

export function semanticSimilarity(A, B) {

    const textA = [
        A.decision.label,
        ...(A.reasons || []).map(r => r.label),
        ...(A.outcomes || []).map(o => o.label)
    ].join(" ");

    const textB = [
        B.decision.label,
        ...(B.reasons || []).map(r => r.label),
        ...(B.outcomes || []).map(o => o.label)
    ].join(" ");

    const score = jaccardSimilarity(

        tokenize(textA),

        tokenize(textB)

    );

    return {

        score: Math.round(score * 100),

        reasons: [

            "Semantic similarity based on decision language"

        ]

    };

}