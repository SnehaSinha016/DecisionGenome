import { metadataSimilarity } from "./metadataEngine.js";

import { graphSimilarity } from "./graphEngine.js";

import { semanticSimilarity } from "./semanticEngine.js";

import { aggregateEvidence } from "./evidenceAggregator.js";

export function buildRelationship(A, B) {

    const metadata =
        metadataSimilarity(A, B);

    const graph =
        graphSimilarity(A, B);

    const semantic =
        semanticSimilarity(A, B);

    const intelligence =
        aggregateEvidence(

            metadata,

            graph,

            semantic

        );

    return {

        source: A.decision.id,

        target: B.decision.id,

        ...intelligence,

        engines: {

            metadata: metadata.score,

            graph: graph.score,

            semantic: semantic.score

        }

    };

}