import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizResults = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">

          <div className="text-5xl mb-4">🎉</div>

          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Quiz Results
          </h1>

          <p className="text-slate-500 mb-8">
            Great work, {user?.name || 'Learner'}!
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-green-700 mb-2">
              Your Score
            </p>

            <p className="text-5xl font-bold text-green-700">
              4/5
            </p>

            <p className="text-sm text-green-600 mt-2">
              80% completed successfully
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Correct Answers
              </p>
              <p className="text-2xl font-bold text-slate-800">
                4
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Questions
              </p>
              <p className="text-2xl font-bold text-slate-800">
                5
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-left mb-8">
            <h2 className="font-semibold text-blue-800 mb-2">
              AI Feedback
            </h2>

            <p className="text-sm text-blue-700">
              You demonstrated a strong understanding of the learning
              material. Review the missed question and continue practicing
              to strengthen your competency.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
};

export default QuizResults;