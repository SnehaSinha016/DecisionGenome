import React from "react";

const StatCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">

            {value}

          </h2>

          {subtitle && (
            <p className="text-sm text-gray-400 mt-2">

              {subtitle}

            </p>
          )}

        </div>

        {Icon && (
          <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">

            <Icon
              size={24}
              className="text-blue-600"
            />

          </div>
        )}

      </div>

    </div>
  );
};

export default StatCard;