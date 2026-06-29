import { exploreRelationships } from "../services/relationshipExplorer.js";

export const relationshipExplorer = async (req, res) => {

    try {

        const { type, value } = req.params;

        const graph = await exploreRelationships(

            type,

            decodeURIComponent(value)

        );

        if (!graph) {

            return res.status(404).json({

                success: false,

                message: "Node not found."

            });

        }

        return res.status(200).json({

            success: true,

            ...graph

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