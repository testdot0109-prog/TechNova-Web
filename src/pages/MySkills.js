import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompetencies } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import SkillCard from '../components/SkillCard';
import { BookOpen } from 'lucide-react';

const MySkills = ({ user }) => {
  const navigate = useNavigate();
  const [competencies, setCompetencies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const loadCompetencies = async () => {
      const data = await getCompetencies();
      setCompetencies(data);
      setLoading(false);
    };

    loadCompetencies();
  }, []);

  if (loading || !competencies) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading skills...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'all', label: 'All Skills', icon: BookOpen },
    { id: 'statistical', label: 'Statistical', icon: BookOpen },
    { id: 'technical', label: 'Technical', icon: BookOpen },
    { id: 'digitalGovernance', label: 'Digital Governance', icon: BookOpen },
    { id: 'managerial', label: 'Managerial', icon: BookOpen }
  ];

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return Object.entries(competencies).flatMap(([catKey, catData]) =>
        catData.skills.map(skill => ({ ...skill, category: catData.name }))
      );
    }

    const catData = competencies[activeCategory];
    return catData.skills.map(skill => ({ ...skill, category: catData.name }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={user.name} designation={user.designation} />

      <div className="p-6 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">My Skills</h1>
          <p className="text-slate-600">
            View your current competency levels across all skill domains.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill.name}
              current={skill.current}
              required={skill.required}
            />
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Competency Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(competencies).map(([key, data]) => (
              <div key={key} className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">{data.name}</p>
                <p className={`text-3xl font-bold ${
                  data.score >= 75 ? 'text-green-600' :
                  data.score >= 60 ? 'text-blue-600' :
                  'text-orange-600'
                }`}>
                  {data.score}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySkills;
