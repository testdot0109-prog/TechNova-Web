import React from 'react';
import { Sparkles, Lightbulb, Target } from 'lucide-react';

const AIInsightCard = ({ title, insights, type = 'insight' }) => {
  const icons = {
    insight: Lightbulb,
    sparkles: Sparkles,
    target: Target
  };

  const Icon = icons[type] || Lightbulb;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">AI-Powered Insight</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-slate-700">{insight}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-slate-500">
          ℹ️ This insight is generated using prototype AI logic. Production system will use validated models.
        </p>
      </div>
    </div>
  );
};

export default AIInsightCard;
