import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
  const statusConfig = {
    proficient: { label: 'Proficient', bg: 'bg-green-100', text: 'text-green-700' },
    needsImprovement: { label: 'Needs Improvement', bg: 'bg-orange-100', text: 'text-orange-700' },
    critical: { label: 'Critical Gap', bg: 'bg-red-100', text: 'text-red-700' },
    connected: { label: 'Connected', bg: 'bg-green-100', text: 'text-green-700' },
    prototype: { label: 'Prototype', bg: 'bg-blue-100', text: 'text-blue-700' },
    active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-700' }
  };

  const config = statusConfig[status] || statusConfig.proficient;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`${config.bg} ${config.text} ${sizeClasses} rounded-full font-medium`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
