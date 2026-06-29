export const buildKnowledgeGraph = (documentName, decisions) => {
    console.log("NEW GRAPH BUILDER RUNNING");
console.log(documentName);

    const nodes = [];
    const edges = [];

    const nodeMap = new Map();

    function createNode(type, value) {

    if (!value || value === "") return null;

    const key = `${type}-${value}`;

    // If node already exists, increase frequency
    if (nodeMap.has(key)) {

        const existingNode = nodeMap.get(key);

        existingNode.properties.frequency += 1;
        existingNode.properties.lastSeen = new Date();

        return existingNode;
    }

   const node = {

    id: key,

    label: value,

    type,

    properties: {

        frequency: 1,

        firstSeen: new Date(),

        lastSeen: new Date(),

        importanceScore: 0,

        centralityScore: 0

    }

};

    nodeMap.set(key, node);

    nodes.push(node);

    return node;
}

    // ==========================
    // Document Node
    // ==========================

    const documentNode = createNode(
        "Document",
        documentName
    );

    for (const decision of decisions) {

        // ==========================
        // Decision
        // ==========================

        const decisionNode = createNode(
            "Decision",
            decision.title
        );

        if (documentNode && decisionNode) {

            edges.push({

                source: documentNode.id,

                target: decisionNode.id,

                relation: "CONTAINS"

            });

        }

        // ==========================
        // Department
        // ==========================

        const departmentNode = createNode(
            "Department",
            decision.department
        );

        if (departmentNode) {

            edges.push({

                source: decisionNode.id,

                target: departmentNode.id,

                relation: "BELONGS_TO"

            });

        }
        // ==========================
// Business Domain
// ==========================

const domainNode = createNode(
    "BusinessDomain",
    decision.businessDomain
);

if (domainNode) {

    edges.push({

        source: decisionNode.id,

        target: domainNode.id,

        relation: "HAS_DOMAIN"

    });

}
// ==========================
// Priority
// ==========================

const priorityNode = createNode(
    "Priority",
    decision.priority
);

if (priorityNode) {

    edges.push({

        source: decisionNode.id,

        target: priorityNode.id,

        relation: "HAS_PRIORITY"

    });

}
// ==========================
// Impact
// ==========================

const impactNode = createNode(
    "Impact",
    decision.impactLevel
);

if (impactNode) {

    edges.push({

        source: decisionNode.id,

        target: impactNode.id,

        relation: "HAS_IMPACT"

    });

}
// ==========================
// Decision Category
// ==========================

const categoryNode = createNode(
    "Category",
    decision.decisionCategory
);

if (categoryNode) {

    edges.push({

        source: decisionNode.id,

        target: categoryNode.id,

        relation: "HAS_CATEGORY"

    });

}
 // ==========================
// Tags
// ==========================

for (const tag of decision.tags || []) {

    const tagNode = createNode(
        "Tag",
        tag
    );

    if (tagNode) {

        edges.push({

            source: decisionNode.id,

            target: tagNode.id,

            relation: "TAGGED_AS"

        });

    }

}     
        // ==========================
        // Budget
        // ==========================

        const budgetNode = createNode(
            "Budget",
            decision.budget
        );

        if (budgetNode) {

            edges.push({

                source: decisionNode.id,

                target: budgetNode.id,

                relation: "HAS_BUDGET"

            });

        }

        // ==========================
        // Risk
        // ==========================

        const riskNode = createNode(
            "Risk",
            decision.risk
        );

        if (riskNode) {

            edges.push({

                source: decisionNode.id,

                target: riskNode.id,

                relation: "HAS_RISK"

            });

        }

        // ==========================
        // Reason
        // ==========================

        const reasonNode = createNode(
            "Reason",
            decision.reason
        );

        if (reasonNode) {

            edges.push({

                source: decisionNode.id,

                target: reasonNode.id,

                relation: "HAS_REASON"

            });

        }

        // ==========================
        // Outcome
        // ==========================

        const outcomeNode = createNode(
            "Outcome",
            decision.expectedOutcome
        );

        if (outcomeNode) {

            edges.push({

                source: decisionNode.id,

                target: outcomeNode.id,

                relation: "HAS_OUTCOME"

            });

        }

        // ==========================
        // Stakeholders
        // ==========================

        for (const stakeholder of decision.stakeholders || []) {

            const stakeholderNode = createNode(

                "Stakeholder",

                stakeholder

            );

            if (stakeholderNode) {

                edges.push({

                    source: stakeholderNode.id,

                    target: decisionNode.id,

                    relation: "PARTICIPATED_IN"

                });

            }

        }

    }

    return {

        nodes,

        edges

    };

};