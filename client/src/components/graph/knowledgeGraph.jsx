import { useEffect, useState } from "react";
import axios from "axios";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

import GraphNode from "./GraphNode";
import NodeDrawer from "./NodeDrawer";
import { generateLayout } from "./layoutEngine";

const nodeTypes = {
  custom: GraphNode,
};

dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 70;



export default function KnowledgeGraph() {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode,setSelectedNode]=useState(null);
const [details,setDetails]=useState(null);

  useEffect(() => {

    loadGraph();

  }, []);

  const loadGraph = async () => {

try{
    const res = await axios.get(
      "https://decisiongenome-1.onrender.com/graph"
    );

    const graphNodes = res.data.nodes.map((node) => ({

    id: node.id,

    type: "custom",

    data: {

        label: node.label,

        type: node.type

    },

    position: {

        x: 0,

        y: 0

    }

}));

    const graphEdges = res.data.edges.map((edge, index) => ({
    id:`e${index}`,
    source:edge.source,
    target:edge.target,

    animated:true,

    style:{
        stroke:"#94A3B8",
        strokeWidth:2
    }
}));

  const layoutedNodes = generateLayout(graphNodes);

setNodes(layoutedNodes);

setEdges(graphEdges);
}catch(err){
  console.log(err);
}

  };
  const handleNodeClick=async(_,node)=>{
    if(!node)return;
    try{
    setSelectedNode(node.data);

    const res=await axios.get(

        `https://decisiongenome-1.onrender.com/graph/explore?type=${node.data.type}&value=${node.data.label}`

    );

    setDetails(res.data);
  }catch(err){
    console.log(err);
  }

};

  return (

    <div
className="
h-[700px]
rounded-2xl
overflow-hidden
border
border-gray-200
"
>

     <ReactFlow
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    fitView
    fitViewOptions={{
      padding:0.2
    }}
    onNodeClick={handleNodeClick}
    attributionPosition="bottom-left"
    proOptions={{ hideAttribution: true }}
>

       <MiniMap
    pannable
    zoomable
    nodeStrokeWidth={3}
/>

        <Controls
    showInteractive={false}
/>

       <Background
    gap={20}
    size={1}
    color="#E5E7EB"
/>

      </ReactFlow>
      <NodeDrawer

    node={selectedNode}

    details={details}

    onClose={()=>{
        setSelectedNode(null);
        setDetails(null);
    }}

/>

    </div>

  );

}