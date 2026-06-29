import { queryEngine } from "../services/queryEngine.js";

export const searchQuery = async (req, res) => {

    try {

        const { query } = req.body;

        if (!query) {

            return res.status(400).json({

                success: false,

                message: "Query is required."

            });

        }

        const result = await queryEngine(query);

        return res.json({

            success: true,

            ...result

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