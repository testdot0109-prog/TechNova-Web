import React from 'react';

const ProgressBar = ({ current, total, label, color = 'blue' }) => {
  const percentage = Math.round((current / total) * 100);

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          <span className="text-sm text-slate-500">{current} / {total}</span>
        </div>
      )}
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`absolute h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-1000 progress-animate`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      {label && (
        <p className="text-xs text-slate-500 mt-1 text-right">{percentage}% complete</p>
      )}
    </div>
  );
};

export default ProgressBar;
