import { getNodeAnalytics } from "../services/graphAnalytics.js";

export const getAnalytics = async (req, res) => {

    try {

        const { type } = req.params;

        const data = await getNodeAnalytics(type);

        return res.status(200).json({

            success: true,

            type,

            total: data.length,

            data

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