import React from 'react';
import { Clock, Award, ArrowRight } from 'lucide-react';

const CourseCard = ({ course, onStart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 card-hover fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{course.title}</h3>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
              {course.provider}
            </span>
            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
              {course.level}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">{course.aiMatch}%</div>
          <p className="text-xs text-slate-500">AI Match</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Award size={16} />
          <span>{course.skills.join(', ')}</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg">
        <span className="font-semibold text-slate-700">Why recommended:</span> {course.reason}
      </p>

      <div className="flex items-center space-x-3">
        <button 
          onClick={() => onStart(course)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <span>Start Learning</span>
          <ArrowRight size={16} />
        </button>
        <button 
          onClick={() => onViewDetails(course)}
          className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Details
        </button>
      </div>

      {/* Prototype Badge */}
      <div className="mt-3 text-xs text-slate-400 text-center">
        ⚠️ Prototype / Mock Catalogue — Not real iGOT data
      </div>
    </div>
  );
};

export default CourseCard;
