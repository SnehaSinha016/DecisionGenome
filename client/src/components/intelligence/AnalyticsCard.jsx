import React from "react";

export default function AnalyticsCard({

    title,

    value,

    subtitle,

    icon: Icon

}) {

    return (

        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 hover:shadow-lg transition">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="mt-2 text-xs text-gray-400">

                            {subtitle}

                        </p>

                    )}

                </div>

                {Icon && (

                    <div className="rounded-xl bg-indigo-100 p-3">

                        <Icon

                            size={26}

                            className="text-indigo-600"

                        />

                    </div>

                )}

            </div>

        </div>

    );

}