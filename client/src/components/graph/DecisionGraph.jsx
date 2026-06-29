import { useEffect, useState } from "react";
import {ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

import DecisionNode from "./DecisionNode";
import { generateDecisionLayout } from "./DecisionLayout";
import { getDecisionGraph } from "../../services/graphService";
import DecisionDrawer from "./DecisionDrawer";



export default function DecisionGraph({
    highlightedNodes=[],
    subgraph=null
}) {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [decisionViews, setDecisionViews] = useState([]);
  const nodeTypes = {
  decision: DecisionNode,
  entity: DecisionNode,
};
console.log("highlightedNodes:", highlightedNodes);
console.log("Node IDs:", nodes.map(node => node.id));
const displayNodes = nodes.map(node => {

    const highlighted = highlightedNodes.includes(node.id);

    return {

        ...node,

        style: {

            ...node.style,

            border: highlighted
                ? "3px solid #4F46E5"
                : node.style?.border,

            boxShadow: highlighted
                ? "0 0 20px rgba(79,70,229,0.5)"
                : node.style?.boxShadow

        }

    };

});
useEffect(() => {

    if (!subgraph) return;

   const graphNodes = subgraph.nodes.map((node, index) => ({

    id: node.id,

    type: node.type === "Decision"
        ? "decision"
        : "entity",

    data: node,

    position: {

        x: (index % 5) * 300,

        y: Math.floor(index / 5) * 220

    }

}));

    const graphEdges = subgraph.edges.map(edge => ({

        id: edge._id,

        source: edge.source,

        target: edge.target,

        animated: true,

        type: "smoothstep",

        markerEnd: {

            type: MarkerType.ArrowClosed

        }

    }));

    setNodes(graphNodes);

    setEdges(graphEdges);

}, [subgraph]);
 const onNodeClick = (_, node) => {

  const decision = decisionViews.find(
    (d) => d.decision.id === node.id
  );

  if (decision) {
    setSelectedDecision(decision);
  }

};

  const loadDecisionGraph = async () => {

    try {

      const data = await getDecisionGraph();
      setDecisionViews(data.graph);

console.log(data);

const layout = generateDecisionLayout(
    data.graph
);
console.log("Nodes:", layout.nodes.length);
console.log("Edges:", layout.edges.length);
console.log(layout.edges.slice(0, 5));

      const styledEdges = layout.edges.map((edge) => ({

        ...edge,

        type: "smoothstep",

        animated: true,

        markerEnd: {

          type: MarkerType.Arrowclosed,
          width:20,
          height:20

        },

        style: {
    stroke: "#6366F1",
    strokeWidth: 2.5
},

      }));

      setNodes(layout.nodes);

      setEdges(styledEdges);

    }

    catch (err) {

      console.error(err);

    }

  };
  useEffect(() => {

    if (!subgraph) {

        loadDecisionGraph();

    }

}, [subgraph]);
  useEffect(() => {
    console.log("DecisionGraph highlightedNodes:", highlightedNodes);
}, [highlightedNodes]);

  return (

    <div className="h-[900px] rounded-3xl overflow-hidden border border-gray-200 shadow bg-white">

      <ReactFlow

        nodes={displayNodes}

        edges={edges}

        nodeTypes={nodeTypes}

        fitView

        attributionPosition="bottom-left"

        proOptions={{ hideAttribution: true }}
    onNodeClick={onNodeClick}
    

      >

        <MiniMap
          pannable
          zoomable
          nodeStrokeWidth={3}
        />

        <Controls  showInteractive={false} position="bottom-right"/>

        <Background
          gap={30}
          size={2}
          variant={BackgroundVariant.Dots}
        />

      </ReactFlow>
       <DecisionDrawer
  open={selectedDecision !== null}
  decision={selectedDecision}
  onClose={() => setSelectedDecision(null)}
/>

    </div>

  );

}