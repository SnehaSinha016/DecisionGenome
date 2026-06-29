import mongoose from "mongoose";

const EdgeSchema = new mongoose.Schema({

    source: String,

    target: String,

    relation: String,

    weight: {

        type: Number,

        default: 1

    },

    confidence: {

        type: Number,

        default: 1

    }

}, {

    timestamps: true

});

EdgeSchema.index({

    source: 1

});

EdgeSchema.index({

    target: 1

});

EdgeSchema.index({

    relation: 1

});

export default mongoose.model("Edge", EdgeSchema);