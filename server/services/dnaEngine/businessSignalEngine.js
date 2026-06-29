export function buildBusinessSignals(features) {

    return {

        innovationSignal:
            features.tagCount * 10,

        collaborationSignal:
            features.stakeholderCount * 20,

        executionSignal:
            features.reasonCount * 15,

        riskSignal:
            features.riskCount * 25,

        outcomeSignal:
            features.outcomeCount * 15,

        organizationalReach:

            (features.department ? 20 : 0) +

            (features.businessDomain ? 20 : 0) +

            features.stakeholderCount * 10

    };

}