import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendedCourses } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import CourseCard from '../components/CourseCard';
import AIInsightCard from '../components/AIInsightCard';
import { GraduationCap, Award } from 'lucide-react';

const Learning = ({ user }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await getRecommendedCourses();
      setCourses(data);
      setLoading(false);
    };

    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  const handleStartCourse = (course) => {
    // For prototype, show a simple message
    alert(`Starting course: ${course.title}\n\nIn production, this would open the iGOT Karmayogi learning interface.`);
  };

  const handleViewDetails = (course) => {
    alert(`Course Details:\n\n${course.title}\n\nProvider: ${course.provider}\nDuration: ${course.duration}\nAI Match: ${course.aiMatch}%\n\n${course.reason}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={user.name} designation={user.designation} />

      <div className="p-6 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Personalized Learning</h1>
          <p className="text-slate-600">
            AI-recommended courses based on your skill gaps and target role.
          </p>
        </div>

        {/* Integration Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Award className="text-green-600 mt-1" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 mb-1">
                iGOT Karmayogi Integration — Prototype API
              </h3>
              <p className="text-sm text-green-700">
                This demo uses mock course data. In production, TechNova will integrate with real iGOT Karmayogi and NSSTA/TPAC APIs to fetch live course catalogues and learning history.
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation Logic */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <GraduationCap className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Prototype Recommendation Logic</h3>
              <p className="text-sm text-blue-700 mb-2">
                Courses are ranked using: <strong>Recommendation Priority = Skill Gap + Role Relevance + Learning History</strong>
              </p>
              <p className="text-xs text-blue-600">
                This simple, explainable algorithm ensures recommendations are transparent. Production systems will use validated competency frameworks and more sophisticated AI/ML models.
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              onStart={handleStartCourse}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* AI Insight */}
        <AIInsightCard
          title="Why These Recommendations?"
          type="sparkles"
          insights={[
            `Courses are matched to your highest-priority skill gaps (Python, GIS, SQL).`,
            `AI Match scores reflect semantic similarity between course content and your competency needs.`,
            `All recommended courses are available through iGOT Karmayogi or NSSTA/TPAC training programmes.`
          ]}
        />

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">How This Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-slate-700 mb-2">Skill Analysis</h4>
              <p className="text-sm text-slate-600">
                TechNova analyzes your current competencies and identifies gaps.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-slate-700 mb-2">AI Matching</h4>
              <p className="text-sm text-slate-600">
                AI matches courses to your gaps using semantic analysis.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-slate-700 mb-2">Personalized Feed</h4>
              <p className="text-sm text-slate-600">
                You receive a curated list of high-impact learning resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
