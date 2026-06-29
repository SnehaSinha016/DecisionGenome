console.log("GraphSearch Mounted");
import { useState } from "react";
import { Search } from "lucide-react";

import { searchGraph } from "../../services/searchService";

export default function GraphSearch({

    setHighlightedNodes

}) {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);
    const handleKeyDown = (e) => {

    if (e.key === "Enter") {

        handleSearch(query);

    }

};

    const handleSearch = async (value) => {
        console.log("Handle search called")
        setQuery(value);

        if (!value.trim()) {

            setHighlightedNodes([]);

            return;

        }

        try {

            setLoading(true);
            console.log("Searching for:", query);

            const res = await searchGraph("Decision",value);
    console.log("API Response:", res);
    console.log("Highlight IDs:", res.highlightNodes);

        setHighlightedNodes(res.highlightNodes || []);


        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="mb-5">

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                />

                <input

                    value={query}

                    onChange={(e) => setQuery(e.target.value)}

                    placeholder="Search organization..."

                    className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"

                />
                <button
    onClick={() => handleSearch(query)}
>
    Search
</button>

            </div>

            {loading && (

                <p className="text-sm text-gray-500 mt-2">

                    Searching...

                </p>

            )}

        </div>

    );

}