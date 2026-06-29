import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({

    id: {
        type: String,
        unique: true,
        required: true
    },

    label: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    properties: {

        frequency: {
            type: Number,
            default: 1
        },

        firstSeen: {
            type: Date,
            default: Date.now
        },

        lastSeen: {
            type: Date,
            default: Date.now
        },

        importanceScore: {
            type: Number,
            default: 0
        },

        centralityScore: {
            type: Number,
            default: 0
        }

    }

}, {

    timestamps: true

});

NodeSchema.index({
    type: 1
});

NodeSchema.index({
    label: 1
});

export default mongoose.model("Node", NodeSchema);