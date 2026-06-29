import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    originalFileName: String,

    documentType: String,

    summary: {
        type: String,
        default: ""
    },

    uploadedBy: {
        type: String,
        default: "System"
    },

    totalPages: {
        type: Number,
        default: 0
    },

    totalDecisions: {
        type: Number,
        default: 0
    },

    totalNodes: {
        type: Number,
        default: 0
    },

    totalEdges: {
        type: Number,
        default: 0
    },

    processingTime: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: [
            "Processing",
            "Completed",
            "Failed"
        ],
        default: "Completed"
    },

    aiVersion: {
        type: String,
        default: "DecisionGenome v1"
    }

}, {

    timestamps: true

});

DocumentSchema.index({ documentType: 1 });

export default mongoose.model("Document", DocumentSchema);