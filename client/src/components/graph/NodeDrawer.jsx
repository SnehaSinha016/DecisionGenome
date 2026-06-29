import { X } from "lucide-react";

export default function NodeDrawer({

    node,

    details,

    onClose

}) {

    if (!node) return null;

    return (

        <div
            className="
            fixed
            right-0
            top-0
            h-screen
            w-[380px]
            bg-white
            border-l
            border-gray-200
            shadow-xl
            z-50
            p-6
            overflow-y-auto
        "
        >

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold">

                        {node.label}

                    </h2>

                    <p className="text-gray-500">

                        {node.type}

                    </p>

                </div>

                <button onClick={onClose}>

                    <X/>

                </button>

            </div>

            <div className="mt-8">

                <h3 className="font-semibold">

                    Total Connections

                </h3>

                <p className="text-3xl mt-2">

                    {details?.statistics?.totalConnections || 0}

                </p>

            </div>

            <div className="mt-8">

                <h3 className="font-semibold mb-3">

                    Connected Nodes

                </h3>

                {

                    details?.connectedNodes &&

                    Object.entries(details.connectedNodes).map(

                        ([type,nodes])=>(

                            <div
                                key={type}
                                className="mb-5"
                            >

                                <h4 className="text-sm uppercase text-gray-500 mb-2">

                                    {type}

                                </h4>

                                {

                                    nodes.map(node=>(

                                        <div
                                            key={node.id}
                                            className="
                                            border
                                            rounded-xl
                                            p-3
                                            mb-2
                                        "
                                        >

                                            {node.label}

                                        </div>

                                    ))

                                }

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}