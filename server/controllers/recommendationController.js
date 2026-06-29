import { recommendDecisions } from "../services/recommendationService.js";

export const recommend = async (req, res) => {

    try {
         console.log("REQUEST BODY:");
        console.log(req.body);
        
        const recommendation = await recommendDecisions(req.body);

        return res.status(200).json({

            success: true,

            total: recommendation.length,

            recommendations: recommendation

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