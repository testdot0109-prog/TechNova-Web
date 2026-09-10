import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getCompetencies, getSkillGaps } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import StatCard from '../components/StatCard';
import SkillCard from '../components/SkillCard';
import AIInsightCard from '../components/AIInsightCard';
import { TrendingUp, Target, Award, BookOpen } from 'lucide-react';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [competencies, setCompetencies] = useState(null);
  const [skillGaps, setSkillGaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [profileData, compData, gapsData] = await Promise.all([
        getUserProfile(),
        getCompetencies(),
        getSkillGaps()
      ]);
      setProfile(profileData);
      setCompetencies(compData);
      setSkillGaps(gapsData.slice(0, 4));
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading || !profile || !competencies) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const topGaps = skillGaps;

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={profile.name} designation={profile.designation} />

      <div className="p-6 ml-64">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome back, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-600">
            Here's your personalized competency overview for today.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Role Readiness"
            value={`${profile.roleReadiness}%`}
            subtitle={`Target: ${profile.targetRole}`}
            icon={<Target size={24} />}
            color="blue"
          />
          <StatCard
            title="Overall Competency"
            value={`${Math.round((competencies.statistical.score + competencies.technical.score + competencies.digitalGovernance.score + competencies.managerial.score) / 4)}%`}
            subtitle="Across all domains"
            icon={<Award size={24} />}
            color="green"
          />
          <StatCard
            title="Skill Gaps"
            value={skillGaps.length}
            subtitle="Priority areas to improve"
            icon={<TrendingUp size={24} />}
            color="orange"
          />
          <StatCard
            title="Learning Progress"
            value="74%"
            subtitle="Training completion rate"
            icon={<BookOpen size={24} />}
            color="purple"
          />
        </div>

        {/* Role Readiness Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Role Readiness Progress</h3>
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e2e8f0"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#2563eb"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(profile.roleReadiness / 100) * 351.68} 351.68`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-slate-800">{profile.roleReadiness}%</span>
                  <p className="text-xs text-slate-500">Ready</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-700 mb-2">Target: {profile.targetRole}</h4>
              <p className="text-sm text-slate-600 mb-4">
                You're {profile.roleReadiness}% ready for the Senior Statistical Analyst role. 
                Focus on closing technical skill gaps to reach 85%+ readiness.
              </p>
              <button 
                onClick={() => navigate('/skill-gap')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Skill Gaps
              </button>
            </div>
          </div>
        </div>

        {/* Competency Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div 
            onClick={() => navigate('/my-skills')}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 card-hover cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Statistical</h3>
              <span className="text-2xl font-bold text-blue-600">{competencies.statistical.score}%</span>
            </div>
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-blue-600 rounded-full"
                style={{ width: `${competencies.statistical.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Your strongest domain</p>
          </div>

          <div 
            onClick={() => navigate('/my-skills')}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 card-hover cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Technical</h3>
              <span className="text-2xl font-bold text-orange-600">{competencies.technical.score}%</span>
            </div>
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-orange-600 rounded-full"
                style={{ width: `${competencies.technical.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-red-600 mt-2 font-medium">Priority improvement area</p>
          </div>

          <div 
            onClick={() => navigate('/my-skills')}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 card-hover cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Digital Governance</h3>
              <span className="text-2xl font-bold text-purple-600">{competencies.digitalGovernance.score}%</span>
            </div>
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-purple-600 rounded-full"
                style={{ width: `${competencies.digitalGovernance.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">On track</p>
          </div>

          <div 
            onClick={() => navigate('/my-skills')}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 card-hover cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Managerial</h3>
              <span className="text-2xl font-bold text-green-600">{competencies.managerial.score}%</span>
            </div>
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-green-600 rounded-full"
                style={{ width: `${competencies.managerial.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Strong performance</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skill Gaps */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Skill Gaps</h3>
            <div className="space-y-4">
              {topGaps.map((gap, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-700">{gap.skill}</p>
                    <p className="text-xs text-slate-500">{gap.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{gap.current} / {gap.required}</p>
                    <p className="text-xs text-red-600 font-medium">Gap: {gap.gap}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/skill-gap')}
              className="mt-4 w-full bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              View All Skill Gaps
            </button>
          </div>

          {/* AI Insight */}
          <AIInsightCard
            title="AI-Powered Insight"
            type="sparkles"
            insights={[
              `Your strongest area is Statistical Competency (${competencies.statistical.score}%).`,
              `Based on your target role and current skill profile, improving Python, GIS and SQL will have the highest impact on your role readiness.`,
              `Closing these technical gaps could increase your role readiness from ${profile.roleReadiness}% to 80%+.`
            ]}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button 
            onClick={() => navigate('/learning')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
          >
            <BookOpen size={18} />
            <span>View Recommendations</span>
          </button>
          <button 
            onClick={() => navigate('/assessment')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-2"
          >
            <Award size={18} />
            <span>Take Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
