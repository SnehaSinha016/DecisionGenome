export const buildKnowledgeGraph = (documentName, decisions) => {

    const nodes = [];
    const edges = [];

    const nodeSet = new Set();

    const addNode = (id, type, label) => {

        if (!label || label === "") return;

        if (!nodeSet.has(id)) {

            nodeSet.add(id);

            nodes.push({
                id,
                type,
                label
            });

        }

    };

    for (const decision of decisions) {

        const decisionId = `Decision-${decision.title}`;

        addNode(
            decisionId,
            "Decision",
            decision.title
        );

        // ==========================
        // Document
        // ==========================

        const documentId = `Document-${documentName}`;

        addNode(
            documentId,
            "Document",
            documentName
        );

        edges.push({
            source: documentId,
            target: decisionId,
            relation: "CONTAINS"
        });

        // ==========================
        // Department
        // ==========================

        if (decision.department) {

            const id = `Department-${decision.department}`;

            addNode(
                id,
                "Department",
                decision.department
            );

            edges.push({
                source: decisionId,
                target: id,
                relation: "BELONGS_TO"
            });

        }

        // ==========================
        // Budget
        // ==========================

        if (decision.budget) {

            const id = `Budget-${decision.budget}`;

            addNode(
                id,
                "Budget",
                decision.budget
            );

            edges.push({
                source: decisionId,
                target: id,
                relation: "HAS_BUDGET"
            });

        }

        // ==========================
        // Risk
        // ==========================

        if (decision.risk) {

            const id = `Risk-${decision.risk}`;

            addNode(
                id,
                "Risk",
                decision.risk
            );

            edges.push({
                source: decisionId,
                target: id,
                relation: "HAS_RISK"
            });

        }

        // ==========================
        // Reason
        // ==========================

        if (decision.reason) {

            const id = `Reason-${decision.reason}`;

            addNode(
                id,
                "Reason",
                decision.reason
            );

            edges.push({
                source: decisionId,
                target: id,
                relation: "HAS_REASON"
            });

        }

        // ==========================
        // Outcome
        // ==========================

        if (decision.expectedOutcome) {

            const id = `Outcome-${decision.expectedOutcome}`;

            addNode(
                id,
                "Outcome",
                decision.expectedOutcome
            );

            edges.push({
                source: decisionId,
                target: id,
                relation: "HAS_OUTCOME"
            });

        }

        // ==========================
        // Stakeholders
        // ==========================

        for (const stakeholder of decision.stakeholders || []) {

            const id = `Stakeholder-${stakeholder}`;

            addNode(
                id,
                "Stakeholder",
                stakeholder
            );

            edges.push({
                source: id,
                target: decisionId,
                relation: "PARTICIPATED_IN"
            });

        }

    }

    return {

        nodes,

        edges

    };

};