import { useState } from "react";
import { Search } from "lucide-react";

import { exploreGraph } from "../../services/traversalService";

export default function RelationshipExplorer({

    onGraphLoaded

}) {

    const [nodeId, setNodeId] = useState("");

    const [depth, setDepth] = useState(2);

    const [loading, setLoading] = useState(false);

    const handleExplore = async () => {

        if (!nodeId.trim()) return;

        try {

            setLoading(true);

            const data = await exploreGraph(nodeId, depth);

            onGraphLoaded(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow mb-6">

            <h2 className="font-semibold text-lg mb-4">

                Relationship Explorer

            </h2>

            <div className="flex gap-3">

                <div className="flex-1 relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input

                        value={nodeId}

                        onChange={(e) => setNodeId(e.target.value)}

                        placeholder="Enter Node ID"

                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3"

                    />

                </div>

                <select

                    value={depth}

                    onChange={(e) => setDepth(Number(e.target.value))}

                    className="rounded-xl border border-gray-300 px-4"

                >

                    <option value={1}>Depth 1</option>

                    <option value={2}>Depth 2</option>

                    <option value={3}>Depth 3</option>

                </select>

                <button

                    onClick={handleExplore}

                    disabled={loading}

                    className="rounded-xl bg-indigo-600 px-6 text-white hover:bg-indigo-700"

                >

                    {loading ? "Loading..." : "Explore"}

                </button>

            </div>

        </div>

    );

}