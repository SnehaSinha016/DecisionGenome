import { extractDecisionFeatures } from "./featureExtractor.js";
import { buildBusinessSignals } from "./businessSignalEngine.js";
import { generateFingerprint } from "./decisionFingerprint.js";

export function buildDecisionIntelligence(decisionView) {

    const features =
        extractDecisionFeatures(decisionView);

    const signals =
        buildBusinessSignals(features);

    const fingerprint =
        generateFingerprint(signals);

    return {

        decision: decisionView.decision,

        features,

        signals,

        fingerprint

    };

}