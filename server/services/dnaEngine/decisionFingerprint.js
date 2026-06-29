export function generateFingerprint(signals) {

    return {

        innovation:

            Math.min(100, signals.innovationSignal),

        collaboration:

            Math.min(100, signals.collaborationSignal),

        executionComplexity:

            Math.min(100, signals.executionSignal),

        riskExposure:

            Math.min(100, signals.riskSignal),

        strategicImpact:

            Math.min(

                100,

                signals.outcomeSignal +

                signals.organizationalReach

            )

    };

}