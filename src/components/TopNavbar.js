import React from 'react';
import { Bell, User, Shield } from 'lucide-react';

const TopNavbar = ({ userName, designation }) => {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Good morning, {userName.split(' ')[0]} 👋
        </h2>
        <p className="text-sm text-slate-500">{designation}</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Integration Status Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
          <Shield size={14} className="text-green-600" />
          <span className="text-xs text-green-700 font-medium">
            iGOT Prototype API Connected
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700">{userName}</p>
            <p className="text-xs text-slate-500">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
