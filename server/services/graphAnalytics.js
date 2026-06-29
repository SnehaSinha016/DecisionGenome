import Node from "../models/Node.js";

const ALLOWED_TYPES = [

    "Department",
    "BusinessDomain",
    "Priority",
    "Impact",
    "Category",
    "Stakeholder",
    "Tag",
    "Reason",
    "Risk",
    "Outcome",
    "Budget"

];

export const getNodeAnalytics = async (type) => {

    if (!ALLOWED_TYPES.includes(type)) {

        throw new Error("Invalid node type.");

    }

    return await Node.aggregate([

        {
            $match: {
                type
            }
        },

        {
            $project: {

                _id: 0,

                id: 1,

                name: "$label",

                frequency: "$properties.frequency"

            }

        },

        {
            $sort: {

                frequency: -1,

                name: 1

            }

        }

    ]);

};