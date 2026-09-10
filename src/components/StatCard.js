import React from 'react';

const StatCard = ({ title, value, subtitle, icon, color = 'blue' }) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-600',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-600',
      text: 'text-green-600'
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'bg-orange-600',
      text: 'text-orange-600'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-600',
      text: 'text-purple-600'
    }
  };

  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {subtitle}
          </p>
        </div>

        <div
          className={`w-12 h-12 ${styles.icon} rounded-lg flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>

      <div className={`mt-4 h-1 rounded-full ${styles.bg}`}>
        <div className={`h-1 rounded-full ${styles.icon} w-2/3`}></div>
      </div>
    </div>
  );
};

export default StatCard;