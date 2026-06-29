import HorizontalBar from "./HorizontalBar";
export default function TopList({

    title,

    items

}) {

    const maxConnections = Math.max(

        ...items.map(item => item.connections),

        1

    );

    return (

        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">

            <h2 className="text-lg font-semibold mb-5">

                {title}

            </h2>

            <div className="space-y-4">

                {items.map((item) => (

                    <div key={item.label}>

                        <div className="flex justify-between mb-1">

                            <span className="text-sm font-medium">

                                {item.label}

                            </span>

                            <span className="text-sm text-gray-500">

                                {item.connections}

                            </span>

                        </div>

                     <HorizontalBar

    value={item.connections}

    max={maxConnections}

/>

                    </div>

                ))}

            </div>

        </div>

    );

}