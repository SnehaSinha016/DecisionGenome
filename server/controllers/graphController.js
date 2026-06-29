import Node from "../models/Node.js";
import Edge from "../models/Edge.js";
import Decision from "../models/Decision.js";
import { getSubgraph } from "../services/graphTraversal.js";
import {
    graphIntelligence,
    calculateDecisionImpact,
    generateGraphInsights
} from "../services/graphIntelligenceService.js";
export const getGraph = async (req, res) => {

    try {

        const nodes = await Node.find();

        const edges = await Edge.find();

        return res.status(200).json({

            success: true,

            nodes,

            edges

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
export const getDepartmentGraph = async (req, res) => {

    try {

        const department = req.params.department;

        // Default depth = 2
        const depth = parseInt(req.query.depth) || 2;

        const departmentNode = await Node.findOne({

            type: "Department",

            label: department

        });

        if (!departmentNode) {

            return res.status(404).json({

                success: false,

                message: "Department not found"

            });

        }

        const graph = await getSubgraph(

            departmentNode.id,

            depth

        );

        return res.status(200).json({

            success: true,

            department,

            depth,

            nodes: graph.nodes,

            edges: graph.edges

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
export const getStakeholderGraph = async (req, res) => {

    try {

        const stakeholder = req.params.stakeholder;

        const decisions = await Decision.find({

            stakeholders: stakeholder

        });

        return res.json({

            success: true,

            stakeholder,

            decisions

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
export const getDecisionGraph = async (req, res) => {

    try {

        const id = req.params.id;

        const decision = await Decision.findById(id);

        if (!decision) {

            return res.status(404).json({

                success: false,

                message: "Decision not found"

            });

        }

        return res.json({

            success: true,

            decision

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
export const getDecisionImpact = async (req, res) => {

    try {

        const result = await calculateDecisionImpact(

            req.params.id

        );

        res.json({

            success: true,

            ...result

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
export const getGraphIntelligence = async (req, res) => {

    try {

        const result = await graphIntelligence();

        res.json({

            success: true,

            ...result

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
export const getGraphInsights = async (req, res) => {

    try {

        const result = await generateGraphInsights();

        res.json({

            success: true,

            ...result

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};