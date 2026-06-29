import { searchGraph } from "../services/graphSearchService.js";

export const graphSearch = async (req, res) => {

    try {

        const { q } = req.query;

        if (!q) {

            return res.status(400).json({
                success: false,
                message: "Search query required."
            });

        }

        const result = await searchGraph(q);

        return res.json({

            success: true,

            ...result

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};