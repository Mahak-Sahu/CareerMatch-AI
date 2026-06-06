import React, { memo } from "react";

const categoryConfig = {
  matching: {
    title: "Matching Skills",
    color: "#22c55e",
  },

  similar: {
    title: "Similar Skills",
    color: "#3b82f6",
  },

  missing: {
    title: "Missing Skills",
    color: "#ef4444",
  },
};

const CustomSkillTooltip = memo(
  ({ active, payload, skillData }) => {

    if (!active || !payload?.length)
      return null;

    const item = payload[0].payload;

    const category = item.key;

    const config = categoryConfig[category];

    const skills = skillData[category] || [];

    const visibleSkills = skills.slice(0, 5);

    const remaining = skills.length - 5;

    return (
      <div
        className="
          min-w-[240px]
          rounded-2xl
          bg-zinc-900/90
          backdrop-blur-xl
          p-4
          border
          shadow-2xl
          animate-tooltip
        "
        style={{
          borderColor: config.color,
          boxShadow: `0 0 20px ${config.color}50`,
        }}
      >
        <h3
          className="font-bold text-lg mb-3"
          style={{ color: config.color }}
        >
          {config.title}
        </h3>

        {visibleSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 text-white mb-2"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: config.color,
              }}
            />

            {skill}
          </div>
        ))}

        {remaining > 0 && (
          <div className="text-gray-400 text-sm mt-2">
            +{remaining} more
          </div>
        )}
      </div>
    );
  }
);

export default CustomSkillTooltip;