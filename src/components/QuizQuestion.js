import React from 'react';

const QuizQuestion = ({ question, questionNumber, totalQuestions, selectedAnswer, onSelectAnswer }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 fade-in">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-slate-500">{question.topic}</span>
        </div>
        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-slate-800 mb-6">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedAnswer === index
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === index
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300'
              }`}>
                {selectedAnswer === index && (
                  <span className="text-xs font-bold">✓</span>
                )}
              </div>
              <span className="text-slate-700">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Source Reference */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          📚 Source: {question.source}
        </p>
      </div>
    </div>
  );
};

export default QuizQuestion;
