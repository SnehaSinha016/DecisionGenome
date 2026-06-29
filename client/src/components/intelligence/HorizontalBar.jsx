export default function HorizontalBar({

    value,

    max,

    color = "bg-indigo-600"

}) {

    const percentage = max === 0
        ? 0
        : (value / max) * 100;

    return (

        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">

            <div

                className={`h-full rounded-full transition-all duration-500 ${color}`}

                style={{

                    width: `${percentage}%`

                }}

            />

        </div>

    );

}