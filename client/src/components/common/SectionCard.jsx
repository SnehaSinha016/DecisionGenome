export default function SectionCard({

    title,

    children,

    className = ""

}) {

    return (

        <div
            className={`
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                flex
                flex-col
                ${className}
            `}
        >

            <div className="px-6 pt-6">

                <h2 className="text-xl font-semibold">

                    {title}

                </h2>

            </div>

            <div className="flex-1 min-h-0 p-6">

                {children}

            </div>

        </div>

    );

}