import React from 'react';

const SkillCard = ({ skill, current, required, showRequired = true }) => {
  const gap = required - current;
  const percentage = Math.round((current / required) * 100);

  const getStatus = () => {
    if (current >= required) return { label: 'Proficient', color: 'text-green-600 bg-green-50' };
    if (gap <= 15) return { label: 'Needs Improvement', color: 'text-orange-600 bg-orange-50' };
    return { label: 'Critical Gap', color: 'text-red-600 bg-red-50' };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-800">{skill}</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">{current}</p>
          <p className="text-xs text-slate-500">/ {required}</p>
        </div>
      </div>

      {showRequired && (
        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-slate-500">Progress: {percentage}%</span>
        {gap > 0 && (
          <span className="text-red-600 font-medium">Gap: {gap} points</span>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
