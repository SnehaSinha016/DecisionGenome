import { useEffect, useState } from "react";

import {
    X,
    Brain,
    Building2,
    AlertTriangle,
    Users,
    Tags,
    CheckCircle2,
    Flag,
    Sparkles,
    TrendingUp
} from "lucide-react";

import HorizontalBar from "../intelligence/HorizontalBar";
import { getDecisionImpact } from "../../services/impactService";
import {
    Section,
    Badge,
    MetricCard,
    FingerprintRow
} from "./DrawerComponents";

export default function DecisionDrawer({

    open,
    decision,
    onClose

}) {

    const [impact, setImpact] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

    if (!open || !decision) {

        setImpact(null);
        return;

    }

    const loadImpact = async () => {

        try {

            setLoading(true);

            const data = await getDecisionImpact(
                decision.decision.id
            );

            // 👇 ADD THESE 3 LINES
console.log(JSON.stringify(data, null, 2));            console.log("Scores:", data?.scores);
            console.log("Metrics:", data?.metrics);

            setImpact(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

    loadImpact();

}, [open, decision]);

    if (!open || !decision) return null;

    const fingerprint = {

        innovation: 82,

        collaboration: 74,

        execution: 61,

        risk: 35,

        strategic: 91

    };

    return (

        <div className="fixed top-0 right-0 h-screen w-[480px] bg-white border-l shadow-2xl z-50 overflow-y-auto">

            {/* Header */}

            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">

                <div>

                    <h2 className="flex items-center gap-2 text-xl font-bold">

                        <Brain size={22} />

                        Executive Scorecard

                    </h2>

                    <p className="text-indigo-100 text-sm mt-1">

                        Decision Intelligence

                    </p>

                </div>

                <button onClick={onClose}>

                    <X />

                </button>

            </div>

            <div className="p-6 space-y-6">

                {/* Decision */}

                <div className="bg-gray-50 rounded-2xl p-5">

                    <h2 className="text-2xl font-bold">

                        {decision.decision.label}

                    </h2>

                    <p className="text-gray-500 mt-2">

                        {decision.department?.label}

                    </p>

                </div>
                <div className="bg-gray-50 rounded-2xl p-5">

    <h2 className="text-2xl font-bold">
        {decision.decision.label}
    </h2>

    <p className="text-gray-500 mt-2">
        {decision.department?.label}
    </p>

</div>
{/* Decision Intelligence */}

<Section title="Decision Intelligence">

    {loading ? (

        <p className="text-gray-500">
            Calculating impact...
        </p>

    ) : impact?.scores ? (

        <>

            <p className="text-sm font-medium text-gray-600">

                Overall Impact

            </p>

            <HorizontalBar

                value={impact.scores.overall}

                max={100}

            />

            <h2 className="text-3xl font-bold text-indigo-600 mt-3">

                {impact.scores.overall}/100

            </h2>

            <div className="grid grid-cols-2 gap-4 mt-6">

                <MetricCard

                    title="Connections"

                    value={impact.metrics.totalConnections}

                    icon={TrendingUp}

                    color="text-green-600"

                />

                <MetricCard

                    title="Stakeholders"

                    value={impact.metrics.stakeholders}

                    icon={Users}

                    color="text-blue-600"

                />

                <MetricCard

                    title="Risks"

                    value={impact.metrics.risks}

                    icon={AlertTriangle}

                    color="text-red-600"

                />

                <MetricCard

                    title="Priority"

                    value={impact.metrics.priority}

                    icon={Flag}

                    color="text-orange-600"

                />

            </div>

        </>

    ) : (

        <p className="text-gray-500">

            Unable to calculate decision intelligence.

        </p>

    )}

</Section>
<Section title=" Decision Fingerprint">

    <FingerprintRow

        title="Innovation"

        value={fingerprint.innovation}

        color="bg-indigo-500"

    />

    <FingerprintRow

        title="Collaboration"

        value={fingerprint.collaboration}

        color="bg-blue-500"

    />

    <FingerprintRow

        title="Execution"

        value={fingerprint.execution}

        color="bg-green-500"

    />

    <FingerprintRow

        title="Risk Exposure"

        value={fingerprint.risk}

        color="bg-red-500"

    />

    <FingerprintRow

        title="Strategic Impact"

        value={fingerprint.strategic}

        color="bg-purple-500"

    />

</Section>
<Section title="Department">

    <Badge

        icon={Building2}

        label={decision.department?.label ?? "Unknown"}

    />

</Section>
<Section title=" Stakeholders">

    <div className="flex flex-wrap gap-2">

        {decision.stakeholders.map((item) => (

            <Badge

                key={item.id}

                icon={Users}

                label={item.label}

            />

        ))}

    </div>

</Section>
<Section title=" Risks">

    <div className="flex flex-wrap gap-2">

        {decision.risks.map((item) => (

            <Badge

                key={item.id}

                icon={AlertTriangle}

                label={item.label}

            />

        ))}

    </div>

</Section>
<Section title="🏷 Tags">

    <div className="flex flex-wrap gap-2">

        {decision.tags.map((item) => (

            <Badge

                key={item.id}

                icon={Tags}

                label={item.label}

            />

        ))}

    </div>

</Section>
<Section title=" AI Recommendation">

    <div className="rounded-xl bg-indigo-50 p-4">

        <p className="font-semibold">

            Recommended Action

        </p>

        <p className="text-gray-600 mt-2 text-sm">

            This decision has a strong organizational impact.
            Proceed while monitoring stakeholders and associated risks.

        </p>

    </div>

</Section>
<Section title="Next Actions">

    <ul className="space-y-2 text-gray-700">

        <li> Review Budget</li>

        <li>Notify Stakeholders</li>

        <li>Assign Decision Owner</li>

        <li>Schedule Review Meeting</li>

    </ul>

</Section>
            </div>

        </div>

    );

}