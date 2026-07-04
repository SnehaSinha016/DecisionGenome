import { useEffect, useState } from "react";

import {
  FileText,
  Brain,
  Network,
  Share2,
} from "lucide-react";

import UploadBox from "./UploadBox";
import StatCard from "./StatCard";
import SectionCard from "../common/SectionCard";
import DecisionGraph from "../graph/DecisionGraph";
import Copilot from "../copilot/copilot";
import GraphSearch from "../graph/GraphSearch";
import RelationshipExplorer from "../graph/RelationshipExplorer";
import ExecutiveDashboard from "../intelligence/ExecutiveDashboard";

import { getGraphIntelligence } from "../../services/graphService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [highlightedNodes,setHighlightedNodes]=useState([]);
  const [subgraph, setSubgraph] = useState(null);

  const loadDashboard = async () => {
    try {
      const data = await getGraphIntelligence();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = [
    {
      title: "Documents",
      value: stats?.nodeTypes?.Document ?? 0,
      subtitle: "Uploaded PDFs",
      icon: FileText,
    },
    {
      title: "Decisions",
      value: stats?.nodeTypes?.Decision ?? 0,
      subtitle: "AI Extracted",
      icon: Brain,
    },
    {
      title: "Nodes",
      value: stats?.overview?.totalNodes ?? 0,
      subtitle: "Knowledge Graph",
      icon: Network,
    },
    {
      title: "Edges",
      value: stats?.overview?.totalEdges ?? 0,
      subtitle: "Relationships",
      icon: Share2,
    },
  ];
  useEffect(() => {
    console.log("Dashboard highlightedNodes:", highlightedNodes);
}, [highlightedNodes]);

  return (
    <>
      {/* Upload */}

      <UploadBox onUploadSuccess={loadDashboard} />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Knowledge Graph + Decision Copilot */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

        {/* Knowledge Graph */}

        <SectionCard
          title="Knowledge Graph"
          className="xl:col-span-2"
        >
           <GraphSearch

        setHighlightedNodes={setHighlightedNodes}/>
        <RelationshipExplorer

    onGraphLoaded={setSubgraph}

/>
          <DecisionGraph highlightedNodes={highlightedNodes} subgraph={subgraph}/>
        </SectionCard>

        {/* Decision Copilot */}

        <SectionCard
          title="Decision Copilot"
          className="h-[900px]"
        >
          <Copilot  setHighlightedNodes={setHighlightedNodes} />
        </SectionCard>

      </div>

      {/* Organizational Intelligence */}

      <SectionCard
        title="Organizational Intelligence"
        className="mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Departments */}

          <div>
            <h3 className="font-semibold mb-4">
              Top Departments
            </h3>

            {stats?.topDepartments?.map((item) => (
              <p
                key={item.label}
                className="text-gray-600 mb-2"
              >
                {item.label}
              </p>
            ))}
          </div>

          {/* Risks */}

          <div>
            <h3 className="font-semibold mb-4">
              Top Risks
            </h3>

            {stats?.topRisks?.map((item) => (
              <p
                key={item.label}
                className="text-gray-600 mb-2"
              >
                {item.label}
              </p>
            ))}
          </div>

          {/* Tags */}

          <div>
            <h3 className="font-semibold mb-4">
              Top Tags
            </h3>

            {stats?.topTags?.map((item) => (
              <p
                key={item.label}
                className="text-gray-600 mb-2"
              >
                {item.label}
              </p>
            ))}
          </div>

          {/* Connected Nodes */}

          <div>
            <h3 className="font-semibold mb-4">
              Most Connected
            </h3>

            {stats?.mostConnectedNodes
              ?.slice(0, 5)
              .map((item) => (
                <p
                  key={item.label}
                  className="text-gray-600 mb-2"
                >
                  {item.label}
                </p>
              ))}
          </div>

        </div>
      </SectionCard>
    </>
  );
}

