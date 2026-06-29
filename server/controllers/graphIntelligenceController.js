import { graphIntelligence } from "../services/graphIntelligenceService.js";

export const getGraphIntelligence = async (req, res) => {

    try {

        const intelligence = await graphIntelligence();

        return res.status(200).json({

            success: true,

            ...intelligence

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