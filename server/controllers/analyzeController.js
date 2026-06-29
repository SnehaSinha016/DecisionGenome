import axios from "axios";
import path from "path";
import Document from "../models/Document.js";
import Decision from "../models/Decision.js";
import Node from "../models/Node.js";
import Edge from "../models/Edge.js";
import { buildKnowledgeGraph } from "../services/graphBuilder.js";
export const analyzeDocument = async (req, res) => {

    try {
        const startTime = Date.now();
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF uploaded."
            });
        }

        const filePath = path.resolve(req.file.path);
        const fileName = req.file.originalname;

        console.log("Uploading:", fileName);

        // ==========================
        // Extract Text
        // ==========================

        const textResponse = await axios.post(
            "http://127.0.0.1:8000/extract-text",
            {
                file_path: filePath
            }
        );

        const extractedText = textResponse.data.text;

        if (!extractedText) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from PDF."
            });
        }

        console.log("Text Extracted");

        // ==========================
        // Run AI Modules in Parallel
        // ==========================

const [classifyResponse, decisionResponse] = await Promise.all([

    axios.post(
        "http://127.0.0.1:8000/classify-document",
        {
            text: extractedText
        }
    ),

    axios.post(
        "http://127.0.0.1:8000/extract-decisions",
        {
            text: extractedText
        }
    )

]);

const documentType = classifyResponse.data.documentType;
const decisions = decisionResponse.data.decisions;
       console.log("\n===== AFTER VALIDATION =====");

decisions.forEach((d) => {

    console.log(
        d.title,
        "=>",
        d.department,
        "|",
        d.validationStatus
    );

});

        console.log("Document Type:", documentType);
        console.log("Decisions Found:", decisions.length);

console.log("Before Graph Builder");

        const graph = buildKnowledgeGraph(fileName, decisions);
        console.log("========== GRAPH NODES ==========");

graph.nodes.forEach((node) => {
    console.log(node.type, "->", node.label);
});

console.log("================================");

console.log("After Graph Builder");
        console.log("Knowledge Graph Built");
        console.log("Nodes:", graph.nodes.length);
        console.log("Edges:", graph.edges.length);

        // ==========================
        // Save Document
        // ==========================

        const document = await Document.create({

    name: fileName,

    originalFileName: fileName,

    documentType,

    summary: "",

    uploadedBy: "System",

    totalPages: 0, // We'll improve this later

    totalDecisions: decisions.length,

    totalNodes: graph.nodes.length,

    totalEdges: graph.edges.length,

    processingTime: Date.now() - startTime,

    status: "Completed",

    aiVersion: "DecisionGenome v1"

});
        // ==========================
        // Save Decisions
        // ==========================

        if (decisions && decisions.length > 0) {
        const decisionDocuments = decisions.map((decision) => ({

    documentId: document._id,

    documentName: fileName,

    documentType,

    title: decision.title,

    decisionType: decision.decisionType,

    department: decision.department,

    stakeholders: decision.stakeholders,

    reason: decision.reason,

    budget: decision.budget,

    risk: decision.risk,

    expectedOutcome: decision.expectedOutcome,

    confidence: decision.confidence,

    // Validator

    verificationStatus: decision.verificationStatus,

    verificationReason: decision.verificationReason,

    // Enricher

    businessDomain: decision.businessDomain,

    priority: decision.priority,

    impactLevel: decision.impactLevel,

    timeHorizon: decision.timeHorizon,

    decisionCategory: decision.decisionCategory,

    tags: decision.tags

}));
            
            await Decision.insertMany(decisionDocuments);
            // ==========================
// Save Graph Nodes
// ==========================

 
 for (const node of graph.nodes) {

    await Node.findOneAndUpdate(
        { id: node.id },
        node,
        {
            upsert: true,
            new: true
        }
    );

}

for (const edge of graph.edges) {

    await Edge.findOneAndUpdate(
        {
            source: edge.source,
            target: edge.target,
            relation: edge.relation
        },
        edge,
        {
            upsert: true,
            new: true
        }
    );

}

    console.log("Saved Nodes:", graph.nodes.length);
    console.log("Saved Edges:", graph.edges.length);

}

console.log("Analysis Completed");

return res.status(200).json({

    success: true,

    document,

    decisionCount: decisions.length,

    nodeCount: graph.nodes.length,

    edgeCount: graph.edges.length

});

} catch (error) {

    console.error(error);

    return res.status(500).json({

        success: false,

        message: error.message

    });

}

};
