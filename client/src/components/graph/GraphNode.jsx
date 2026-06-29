import {
  Brain,
  Building2,
  AlertTriangle,
  Tag,
  Users,
  Globe2,
  CheckCircle2,
  Lightbulb,
  FileText,
  FolderTree,
  Star,
  BarChart3,
  Circle,
} from "lucide-react";

const icons = {
  Document: FileText,
  Decision: Brain,
  Department: Building2,
  BusinessDomain: Globe2,
  Priority: Star,
  Impact: BarChart3,
  Category: FolderTree,
  Tag: Tag,
  Risk: AlertTriangle,
  Reason: Lightbulb,
  Outcome: CheckCircle2,
  Stakeholder: Users,
};

const colors = {
  Document: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
  },

  Decision: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
  },

  Department: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
  },

  BusinessDomain: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    border: "border-cyan-200",
  },

  Priority: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },

  Impact: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
  },

  Category: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
  },

  Tag: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
  },

  Risk: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
  },

  Reason: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
  },

  Outcome: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },

  Stakeholder: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
  },
};

export default function GraphNode({ data }) {
  const Icon = icons[data.type] || Circle;

  const style =
    colors[data.type] ||
    colors.Document;

  return (
    <div
      className={`
        bg-white
        rounded-2xl
        border
        ${style.border}
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        px-4
        py-3
        min-w-[220px]
      `}
    >
      <div className="flex items-center gap-4">

        <div
          className={`
            w-12
            h-12
            rounded-xl
            flex
            items-center
            justify-center
            ${style.bg}
          `}
        >
          <Icon
            size={22}
            className={style.text}
          />
        </div>

        <div>

          <p className="font-semibold text-gray-900">

            {data.label}

          </p>

          <p className="text-xs text-gray-500">

            {data.type}

          </p>

        </div>

      </div>
    </div>
  );
}