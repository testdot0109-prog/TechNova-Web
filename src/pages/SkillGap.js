import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSkillGaps, getCompetencies } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import AIInsightCard from '../components/AIInsightCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Target } from 'lucide-react';

const SkillGap = ({ user }) => {
  const navigate = useNavigate();
  const [skillGaps, setSkillGaps] = useState([]);
  const [competencies, setCompetencies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const [gapsData, compData] = await Promise.all([
        getSkillGaps(),
        getCompetencies()
      ]);
      setSkillGaps(gapsData);
      setCompetencies(compData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading || !competencies) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading skill gap analysis...</p>
        </div>
      </div>
    );
  }

  const filteredGaps = filter === 'all' 
    ? skillGaps 
    : skillGaps.filter(gap => gap.category.toLowerCase().includes(filter.toLowerCase()));

  const chartData = filteredGaps.map(gap => ({
    name: gap.skill,
    current: gap.current,
    required: gap.required,
    gap: gap.gap
  }));

  const COLORS = ['#2563eb', '#dc2626'];

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={user.name} designation={user.designation} />

      <div className="p-6 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Skill Gap Analysis</h1>
          <p className="text-slate-600">
            Compare your current skill levels with required competencies for your target role.
          </p>
        </div>

        {/* Formula Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Target className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">How Skill Gap is Calculated</h3>
              <p className="text-sm text-blue-700 mb-2">
                <strong>Skill Gap = Required Competency − Current Competency</strong>
              </p>
              <p className="text-xs text-blue-600">
                This simple, explainable formula helps identify priority areas for improvement. 
                Production systems may use validated competency frameworks with more sophisticated models.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'technical', 'statistical', 'digital governance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Skills' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Current vs Required Skill Levels</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar name="Current Level" dataKey="current" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar name="Required Level" dataKey="required" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-slate-600">Current Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm text-slate-600">Required Level</span>
            </div>
          </div>
        </div>

        {/* Skill Gap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredGaps.map((gap, index) => (
            <div
              key={index}
              onClick={() => setSelectedSkill(selectedSkill?.skill === gap.skill ? null : gap)}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 card-hover cursor-pointer transition-all ${
                selectedSkill?.skill === gap.skill ? 'border-blue-600' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-800">{gap.skill}</h4>
                  <span className="text-xs text-slate-500">{gap.category}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  gap.priority === 'High' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {gap.priority} Priority
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600">Current</span>
                  <span className="font-semibold text-slate-800">{gap.current}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-blue-600 rounded-full"
                    style={{ width: `${(gap.current / gap.required) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Required: {gap.required}</span>
                <span className="text-sm font-bold text-red-600">Gap: {gap.gap}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6 mb-8 fade-in">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {selectedSkill.skill} - Detailed Analysis
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-slate-500">Current Level</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedSkill.current}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Required Level</p>
                    <p className="text-2xl font-bold text-red-600">{selectedSkill.required}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Gap</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedSkill.gap}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-700 mb-2">Why This is a Priority:</h4>
              <p className="text-sm text-slate-600">
                {selectedSkill.skill} is important for data analysis and your target Senior Statistical Analyst role. 
                Closing this gap will directly improve your technical competency score and overall role readiness.
              </p>
            </div>

            <div className="mt-4 flex space-x-3">
              <button 
                onClick={() => navigate('/learning')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Learning Resources
              </button>
              <button 
                onClick={() => setSelectedSkill(null)}
                className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* AI Insight */}
        <AIInsightCard
          title="AI Workforce Insight"
          type="target"
          insights={[
            `Python, GIS, and SQL represent your highest-impact skill gaps.`,
            `Improving these technical skills will increase your role readiness from ${user.roleReadiness || 67}% to 80%+.`,
            `Based on your Statistical Officer role, technical competency improvement should be your primary focus.`
          ]}
        />
      </div>
    </div>
  );
};

export default SkillGap;
