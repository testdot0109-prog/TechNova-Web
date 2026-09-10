import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import AIInsightCard from '../components/AIInsightCard';
import { Brain, FileText, Sparkles, ArrowRight } from 'lucide-react';

const Assessment = ({ user }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Sampling_Methodology.pdf',
      pages: 28,
      topics: ['Sampling', 'Survey Design', 'Data Collection', 'Data Quality'],
      uploaded: '2026-09-08'
    },
    {
      id: 2,
      name: 'Statistical_Quality_Framework.pdf',
      pages: 15,
      topics: ['Data Quality', 'Quality Assurance', 'Standards'],
      uploaded: '2026-09-07'
    },
    {
      id: 3,
      name: 'National_Accounts_Guide.pdf',
      pages: 42,
      topics: ['National Accounts', 'Economic Statistics', 'GDP'],
      uploaded: '2026-09-05'
    }
  ]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleGenerateQuiz = async () => {
    if (!selectedDoc) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const questions = await generateQuiz(selectedDoc.name, 5);
    setQuizQuestions(questions);
    setQuizGenerated(true);
    setIsGenerating(false);
  };

  const handleTakeQuiz = () => {
    // Store quiz data in sessionStorage for the quiz page
    sessionStorage.setItem('currentQuiz', JSON.stringify({
      document: selectedDoc,
      questions: quizQuestions
    }));
    navigate('/take-quiz');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={user.name} designation={user.designation} />

      <div className="p-6 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">AI Assessment Studio</h1>
          <p className="text-slate-600">
            Upload learning material and generate AI-powered assessments automatically.
          </p>
        </div>

        {/* AI Process Flow */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">How AI Assessment Works</h3>
              <p className="text-sm text-slate-600">Natural Language Processing extracts key concepts and generates relevant questions</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-blue-600">1</span>
              </div>
              <p className="text-xs text-slate-600">Upload Document</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-green-600">2</span>
              </div>
              <p className="text-xs text-slate-600">AI Analysis</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-orange-600">3</span>
              </div>
              <p className="text-xs text-slate-600">Question Generation</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-purple-600">4</span>
              </div>
              <p className="text-xs text-slate-600">Take Assessment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Uploaded Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Uploaded Documents</h3>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDoc?.id === doc.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <FileText className={`mt-1 ${
                      selectedDoc?.id === doc.id ? 'text-blue-600' : 'text-slate-400'
                    }`} size={20} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{doc.name}</h4>
                      <p className="text-sm text-slate-500">
                        {doc.pages} pages • {doc.topics.join(', ')}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Uploaded: {doc.uploaded}
                      </p>
                    </div>
                    {selectedDoc?.id === doc.id && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <button className="mt-4 w-full border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
              + Upload New Document
            </button>
          </div>

          {/* Quiz Generation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Generate Assessment</h3>

            {selectedDoc ? (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-700 mb-2">Selected Document</h4>
                  <p className="text-lg font-bold text-blue-600">{selectedDoc.name}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Topics: {selectedDoc.topics.join(', ')}
                  </p>
                  <p className="text-sm text-slate-600">
                    Pages: {selectedDoc.pages}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Quiz Settings</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>• Number of Questions: 5</p>
                    <p>• Question Type: Multiple Choice (MCQ)</p>
                    <p>• Difficulty: Adaptive (based on content)</p>
                    <p>• Include Explanations: Yes</p>
                  </div>
                </div>

                <button
                  onClick={handleGenerateQuiz}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      <span>Generate 5 MCQs</span>
                    </>
                  )}
                </button>

                {quizGenerated && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 fade-in">
                    <h4 className="font-semibold text-green-800 mb-2">✓ Quiz Generated Successfully!</h4>
                    <p className="text-sm text-green-700 mb-3">
                      5 questions generated from {selectedDoc.name}
                    </p>
                    <button
                      onClick={handleTakeQuiz}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Take Quiz Now</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                <p>Select a document to generate quiz</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Insight */}
        <AIInsightCard
          title="AI-Powered Assessment"
          type="sparkles"
          insights={[
            `Questions are generated using NLP to extract key concepts from your learning material.`,
            `Each question includes explanations and source references for better learning.`,
            `Performance data feeds back into your competency profile to track improvement.`
          ]}
        />

        {/* Prototype Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            ⚠️ Prototype — Mock AI generation for demo. Production will use real LLM/NLP models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
