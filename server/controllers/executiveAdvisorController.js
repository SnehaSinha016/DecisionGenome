import { recommendDecisions } from "../services/recommendationService.js";
import { getDecisionAdvice } from "../services/advisorService.js";
import { buildOrganizationalIntelligence } from "../services/organizationalIntelligence.js";

// Future Services
// import { buildDecisionRelationships } from "../services/relationshipEngine/relationshipEngine.js";
// import { buildDecisionIntelligence } from "../services/dnaEngine/decisionIntelligence.js";
// import { buildOrganizationDNA } from "../services/dnaEngine/organizationDNA.js";

export const executiveAdvisor = async (req, res) => {

    try {

        // ----------------------------------------
        // Incoming Decision
        // ----------------------------------------

        const decision = req.body;

        // ----------------------------------------
        // Step 1
        // Find Similar Decisions
        // ----------------------------------------

        const recommendations =
            await recommendDecisions(decision);


        const organizationalIntelligence =
            buildOrganizationalIntelligence({

                decision,

                recommendations

            });


        const relationships = [];

        const fingerprint = {};


        const organizationDNA = {};


        const enterpriseContext = {

            decision,

            recommendations,

            organizationalIntelligence,

            relationships,

            fingerprint,

            organizationDNA,

            generatedAt: new Date(),

            version: "1.0"

        };

        console.log("\n========== ENTERPRISE CONTEXT ==========\n");

        console.log(
            JSON.stringify(
                enterpriseContext,
                null,
                2
            )
        );

        console.log("\n========================================\n");

        const advice =
            await getDecisionAdvice(
                enterpriseContext
            );

        return res.status(200).json({

            success: true,

            enterpriseContext,

            advice

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};