const DECISION_SPACING = 900;

const createNode = (
    id,
    type,
    data,
    x,
    y
) => ({
    id,
    type,
    data,
    position: { x, y }
});

const createEdge = (
    source,
    target
) => ({
    id: `${source}-${target}`,
    source,
    target
});

function addMetadata(
    nodes,
    edges,
    decisionId,
    metadata,
    baseX,
    baseY
) {

    const spacing = 180;

    metadata
        .filter(Boolean)
        .forEach((node, index) => {

            const x =
                baseX -
                ((metadata.length - 1) * spacing) / 2 +
                index * spacing;

            nodes.push(
                createNode(
                    node.id,
                    "entity",
                    node,
                    x,
                    baseY - 180
                )
            );

            edges.push(
                createEdge(
                    decisionId,
                    node.id
                )
            );

        });

}

function addVerticalGroup(
    nodes,
    edges,
    decisionId,
    list,
    startX,
    startY
) {

    list.forEach((node, index) => {

        nodes.push(

            createNode(

                node.id,

                "entity",

                node,

                startX,

                startY + index * 100

            )

        );

        edges.push(

            createEdge(

                decisionId,

                node.id

            )

        );

    });

}

export function generateDecisionLayout(decisionViews) {

    const nodes = [];
    const edges = [];

    decisionViews.forEach((item, index) => {

        const baseX = index * DECISION_SPACING;

        const baseY = 300;

        const decisionId = item.decision.id;

        nodes.push(

            createNode(

                decisionId,

                "decision",

                item.decision,

                baseX,

                baseY

            )

        );

        addMetadata(

            nodes,

            edges,

            decisionId,

            [

                item.department,

                item.businessDomain,

                item.priority,

                item.impact,

                item.category

            ],

            baseX,

            baseY

        );

        addVerticalGroup(

            nodes,

            edges,

            decisionId,

            item.risks,

            baseX - 300,

            baseY + 120

        );

        addVerticalGroup(

            nodes,

            edges,

            decisionId,

            item.stakeholders,

            baseX + 300,

            baseY + 120

        );

        addVerticalGroup(

            nodes,

            edges,

            decisionId,

            item.tags,

            baseX - 300,

            baseY + 420

        );

        addVerticalGroup(

            nodes,

            edges,

            decisionId,

            item.outcomes,

            baseX + 300,

            baseY + 420

        );

        addVerticalGroup(

            nodes,

            edges,

            decisionId,

            item.reasons,

            baseX,

            baseY + 420

        );

    });

    return {

        nodes,

        edges

    };

}