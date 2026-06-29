export function Section({ title, children }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4">
                {title}
            </h3>

            {children}
        </div>
    );
}

export function Badge({

    icon: Icon,

    label

}) {

    return (

        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm">

            <Icon size={16} />

            {label}

        </div>

    );

}

export function MetricCard({

    title,

    value,

    icon: Icon,

    color

}) {

    return (

        <div className="rounded-xl border border-gray-200 p-4">

            <Icon

                size={24}

                className={color}

            />

            <p className="text-xs text-gray-500 mt-3">

                {title}

            </p>

            <h2 className="font-bold text-xl mt-1">

                {value}

            </h2>

        </div>

    );

}

export function FingerprintRow({

    title,

    value,

    color

}) {

    return (

        <div className="mb-4">

            <div className="flex justify-between mb-2">

                <span>

                    {title}

                </span>

                <span>

                    {value}%

                </span>

            </div>

            <div className="h-2 rounded-full bg-gray-200">

                <div

                    className={`${color} h-2 rounded-full`}

                    style={{

                        width: `${value}%`

                    }}

                />

            </div>

        </div>

    );

}