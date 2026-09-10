import React, { useState, useEffect } from 'react';
import { getAdminAnalytics, getIntegrationStatus } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import StatCard from '../components/StatCard';
import AIInsightCard from '../components/AIInsightCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Award, Target, Shield } from 'lucide-react';

const Admin = ({ user }) => {
  const [analytics, setAnalytics] = useState(null);
  const [integrations, setIntegrations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [analyticsData, integrationsData] = await Promise.all([
        getAdminAnalytics(),
        getIntegrationStatus()
      ]);
      setAnalytics(analyticsData);
      setIntegrations(integrationsData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const skillGapChartData = analytics.topSkillGaps.map(gap => ({
    name: gap.skill,
    gap: gap.gap,
    category: gap.category
  }));

  const departmentChartData = analytics.departmentReadiness.map(dept => ({
    name: dept.department,
    readiness: dept.readiness
  }));

  const emergingSkillsData = analytics.emergingSkills.map(skill => ({
    name: skill.skill,
    demand: skill.demand,
    supply: skill.supply
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={user.name} designation={user.designation} />

      <div className="p-6 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">
            Workforce-level competency analytics and insights for strategic planning.
          </p>
        </div>

        {/* Integration Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="text-green-600 mt-1" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 mb-2">
                Government System Integration Status
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-700">
                    <strong>{integrations.iGOT.name}:</strong> {integrations.iGOT.status}
                  </p>
                  <p className="text-xs text-green-600">
                    Last sync: {integrations.iGOT.lastSync}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-700">
                    <strong>{integrations.NSSTA.name}:</strong> {integrations.NSSTA.status}
                  </p>
                  <p className="text-xs text-green-600">
                    Last sync: {integrations.NSSTA.lastSync}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Officials"
            value={analytics.totalOfficials.toLocaleString()}
            subtitle="Across all departments"
            icon={<Users size={24} />}
            color="blue"
          />
          <StatCard
            title="Average Competency"
            value={`${analytics.averageCompetency}%`}
            subtitle="Workforce average"
            icon={<Award size={24} />}
            color="green"
          />
          <StatCard
            title="Critical Skill Gaps"
            value={analytics.criticalSkillGaps}
            subtitle="Priority areas"
            icon={<Target size={24} />}
            color="orange"
          />
          <StatCard
            title="Training Completion"
            value={`${analytics.trainingCompletion}%`}
            subtitle="Last 6 months"
            icon={<TrendingUp size={24} />}
            color="purple"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Skill Gaps */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Workforce Skill Gaps</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillGapChartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tick={{ fontSize: 11 }}
                />
                <YAxis domain={[0, 50]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar name="Skill Gap (%)" dataKey="gap" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-500 mt-4">
              Percentage of workforce with significant gaps in each skill area
            </p>
          </div>

          {/* Department Readiness */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Readiness</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentChartData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar name="Readiness %" dataKey="readiness" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-500 mt-4">
              Role readiness by department (target: 80%+)
            </p>
          </div>
        </div>

        {/* Emerging Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Emerging Skills: Demand vs Supply</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emergingSkillsData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                angle={-30}
                textAnchor="end"
                interval={0}
                height={60}
                tick={{ fontSize: 11 }}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar name="Demand" dataKey="demand" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar name="Supply" dataKey="supply" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 mt-4">
            Gap between workforce demand and current competency supply for emerging skills
          </p>
        </div>

        {/* AI Workforce Insight */}
        <AIInsightCard
          title="AI Workforce Insight"
          type="target"
          insights={[
            `Python, AI/ML and GIS represent the highest emerging competency gaps across the workforce.`,
            `Targeted learning programmes in these areas could significantly improve workforce readiness.`,
            `Departments with readiness below 70% should be prioritized for intervention and training support.`,
            `The demand-supply gap for AI/ML (85% demand vs 32% supply) indicates urgent need for upskilling initiatives.`
          ]}
        />

        {/* Action Items */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Priority 1</h4>
              <p className="text-sm text-blue-700">
                Launch Python and AI/ML training programmes targeting Technical competency improvement.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Priority 2</h4>
              <p className="text-sm text-green-700">
                Focus GIS training on departments with spatial analysis responsibilities.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Priority 3</h4>
              <p className="text-sm text-purple-700">
                Address Cybersecurity gaps through mandatory digital governance training modules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
