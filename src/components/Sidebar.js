import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Brain, 
  FileText, 
  Users, 
  Info,
  LogOut,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/my-skills', label: 'My Skills', icon: BookOpen },
    { path: '/skill-gap', label: 'Skill Gap Analysis', icon: TrendingUp },
    { path: '/learning', label: 'Personalized Learning', icon: GraduationCap },
    { path: '/assessment', label: 'AI Assessment Studio', icon: Brain },
    { path: '/admin', label: 'Admin Dashboard', icon: Users },
    { path: '/about', label: 'About TechNova', icon: Info }
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">T</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">TechNova</h1>
            <p className="text-xs text-slate-400">AI Learning Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Prototype Badge */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">⚠️ Prototype</p>
          <p>Demo data only. Not connected to real government systems.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
