import {
  Brain,
  Building2,
  AlertTriangle,
  Users,
  Tags,
  CheckCircle2,
  Flag,
  Globe2,
  Layers,
} from "lucide-react";

import { Handle, Position } from "reactflow";

const styles = {
  Decision: {
    icon: Brain,
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-400",
  },

  Department: {
    icon: Building2,
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-400",
  },

  Risk: {
    icon: AlertTriangle,
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-400",
  },

  Stakeholder: {
    icon: Users,
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-400",
  },

  Tag: {
    icon: Tags,
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-400",
  },

  Outcome: {
    icon: CheckCircle2,
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-400",
  },

  Priority: {
    icon: Flag,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-400",
  },

  BusinessDomain: {
    icon: Globe2,
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-cyan-400",
  },

  Category: {
    icon: Layers,
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-400",
  },
};

export default function DecisionNode({ data }) {

  const config = styles[data.type] || {
    icon: Layers,
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  };

  const Icon = config.icon;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

      <Handle
        type="target"
        position={Position.Left}
      />

      <div
        className={`
          w-52
          rounded-2xl
          border
          ${config.border}
          bg-white
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
          hover:-translate-y-1
          p-4
        `}
      >
        <div className="flex items-center gap-3">

          <div
            className={`
              w-12
              h-12
              rounded-xl
              ${config.bg}
              flex
              items-center
              justify-center
            `}
          >
            <Icon
              className={config.text}
              size={24}
            />
          </div>

          <div>

            <h3 className="font-semibold text-gray-900">
              {data.label}
            </h3>

            <p className="text-xs text-gray-500">
              {data.type}
            </p>

          </div>

        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />

      <Handle
        type="source"
        position={Position.Right}
      />
    </>
  );
}