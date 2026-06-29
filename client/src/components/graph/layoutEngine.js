const LEVELS = {
  Document: 0,

  Decision: 1,

  Department: 2,
  BusinessDomain: 2,
  Category: 2,
  Priority: 2,
  Impact: 2,

  Stakeholder: 3,
  Risk: 3,
  Outcome: 3,

  Reason: 4,

  Tag: 5,
};

const HORIZONTAL_SPACING = 260;
const VERTICAL_SPACING = 180;

export function generateLayout(nodes) {
  const grouped = {};

  // Group nodes by semantic level
  nodes.forEach((node) => {
    const level = LEVELS[node.data.type] ?? 6;

    if (!grouped[level]) grouped[level] = [];

    grouped[level].push(node);
  });

  // Sort alphabetically
  Object.keys(grouped).forEach((level) => {
    grouped[level].sort((a, b) =>
      a.data.label.localeCompare(b.data.label)
    );
  });

  const positionedNodes = [];

  Object.keys(grouped).forEach((level) => {
    const row = grouped[level];

    const totalWidth = (row.length - 1) * HORIZONTAL_SPACING;

    row.forEach((node, index) => {
      positionedNodes.push({
        ...node,

        position: {
          x: index * HORIZONTAL_SPACING - totalWidth / 2,
          y: level * VERTICAL_SPACING,
        },
      });
    });
  });

  return positionedNodes;
}