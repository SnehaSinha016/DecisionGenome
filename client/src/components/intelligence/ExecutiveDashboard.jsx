import {

    Network,

    Share2,

    Database,

    Layers

} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

import TopList from "./TopList";

export default function ExecutiveDashboard({

    stats

}) {

    if (!stats) return null;

    return (

        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <AnalyticsCard

                    title="Total Nodes"

                    value={stats.overview.totalNodes}

                    subtitle="Knowledge Graph"

                    icon={Database}

                />

                <AnalyticsCard

                    title="Total Edges"

                    value={stats.overview.totalEdges}

                    subtitle="Relationships"

                    icon={Share2}

                />

                <AnalyticsCard

                    title="Graph Density"

                    value={stats.overview.graphDensity}

                    subtitle="Connectivity"

                    icon={Network}

                />

                <AnalyticsCard

                    title="Node Types"

                    value={Object.keys(stats.nodeTypes).length}

                    subtitle="Entity Categories"

                    icon={Layers}

                />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <TopList

                    title="Top Departments"

                    items={stats.topDepartments}

                />

                <TopList

                    title="Top Risks"

                    items={stats.topRisks}

                />

                <TopList

                    title="Top Tags"

                    items={stats.topTags}

                />

                <TopList

                    title="Most Connected Nodes"

                    items={stats.mostConnectedNodes}

                />

            </div>

        </div>

    );

}