import { detectIntent } from "../services/copilot/intentEngine.js";
import { buildEnterpriseContext } from "../services/copilot/contextBuilder.js";
import { askEnterpriseCopilot } from "../services/copilot/copilotService.js";

export const askCopilot = async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {

            return res.status(400).json({

                success: false,

                message: "Question is required."

            });

        }

        // Detect intent
        const intent = detectIntent(question);

        // Build enterprise context
        const context = await buildEnterpriseContext(

            question,

            intent

        );

        // Ask Copilot
        const answer = await askEnterpriseCopilot(

            question,

            context,

            intent

        );

        return res.status(200).json({

            success: true,

            question,

            intent,

            answer,

            context,
            graphActions:{
                highlightNodes:context.relevantNodes
            }

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};