import mongoose from "mongoose";

const DecisionSchema = new mongoose.Schema(

    {

        documentId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Document"

        },

        documentName: String,

        documentType: String,

        // ==========================
        // Decision Information
        // ==========================

        title: {

            type: String,

            required: true,

            trim: true

        },

        decisionType: String,

        department: String,

        stakeholders: [String],

        reason: String,

        budget: String,

        risk: String,

        expectedOutcome: String,

        confidence: Number,

        // ==========================
        // Validator
        // ==========================

        verificationStatus: {

            type: String,

            enum: [

                "Verified",

                "Corrected",

                "Needs Review"

            ]

        },

        verificationReason: String,

        // ==========================
        // Enricher
        // ==========================

        businessDomain: String,

        priority: {

            type: String,

            enum: [

                "Low",

                "Medium",

                "High",

                "Critical"

            ]

        },

        impactLevel: {

            type: String,

            enum: [

                "Low",

                "Medium",

                "High"

            ]

        },

        timeHorizon: String,

        decisionCategory: String,

        tags: [String],
        embedding: {

    type: [Number],

    default: []

},

    },

    {

        timestamps: true

    }

);

// ==========================
// Indexes
// ==========================

DecisionSchema.index({

    department: 1

});

DecisionSchema.index({

    businessDomain: 1

});

DecisionSchema.index({

    priority: 1

});

DecisionSchema.index({

    decisionCategory: 1

});

DecisionSchema.index({

    tags: 1

});

DecisionSchema.index({

    stakeholders: 1

});

DecisionSchema.index({

    title: "text"

});

export default mongoose.model("Decision", DecisionSchema);