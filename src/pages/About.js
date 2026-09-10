import React from 'react';
import TopNavbar from '../components/TopNavbar';

const About = ({ user }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar
        userName={user.name}
        designation={user.designation}
      />

      <div className="p-6 ml-64">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-3">
              About TechNova
            </h1>

            <p className="text-slate-600 text-lg mb-6">
              Smart Learning. Smarter Skills. Future-Ready Workforce.
            </p>

            <div className="space-y-5 text-slate-600">
              <p>
                TechNova is an AI-enabled competency and personalized
                learning platform designed to help officials identify
                competency gaps and discover relevant learning opportunities.
              </p>

              <p>
                The platform connects competency assessment, skill-gap
                analysis, personalized learning recommendations, and
                AI-powered assessments into one continuous learning loop.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h2 className="font-semibold text-blue-800 mb-2">
                  Prototype Notice
                </h2>

                <p className="text-sm text-blue-700">
                  This hackathon prototype uses demo data and simulated
                  government-system integrations. Production deployment would
                  require authorized APIs, validated competency frameworks,
                  security controls, and government infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;