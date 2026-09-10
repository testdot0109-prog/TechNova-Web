import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuiz } from '../services/api';
import TopNavbar from '../components/TopNavbar';
import QuizQuestion from '../components/QuizQuestion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const TakeQuiz = ({ user }) => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedQuiz = sessionStorage.getItem('currentQuiz');
    if (storedQuiz) {
      const data = JSON.parse(storedQuiz);
      setQuizData(data);
      setAnswers(new Array(data.questions.length).fill(null));
    } else {
      navigate('/assessment');
    }
  }, [navigate]);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const handleSelectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Submit quiz
    const results = await submitQuiz(answers);

    // Store results for results page
    sessionStorage.setItem('quizResults', JSON.stringify({
      ...results,
      questions: quizData.questions,
      document: quizData.document
    }));

    navigate('/quiz-results');
    setIsSubmitting(false);
  };

  const question = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar userName={user.name} designation={user.designation} />

      <div className="p-6 ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Take Quiz</h1>
              <p className="text-slate-600">
                {quizData.document.name}
              </p>
            </div>
            <button
              onClick={() => navigate('/assessment')}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft size={20} />
              <span>Back to Assessment Studio</span>
            </button>
          </div>
        </div>

        {/* Quiz Question */}
        <div className="max-w-4xl mx-auto">
          <QuizQuestion
            question={question}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizData.questions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Previous</span>
            </button>

            {/* Question Dots */}
            <div className="flex items-center space-x-2">
              {quizData.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion
                      ? 'bg-blue-600'
                      : answers[index] !== null
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                  }`}
                ></div>
              ))}
            </div>

            {currentQuestion === quizData.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2"
              >
                <CheckCircle size={18} />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Quiz'}</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* Progress Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </p>
            <p className="text-xs text-slate-500">
              {answers.filter(a => a !== null).length} of {quizData.questions.length} answered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;
