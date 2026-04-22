import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard.jsx';
import ScoreBoard from './ScoreBoard.jsx';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (option) => {
    if (isAnswerRevealed) return; // Prevent multiple clicks
    setSelectedOption(option);
    setIsAnswerRevealed(true);

    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    fetchQuestions(); // Optional: refetch questions to potentially randomize in future
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading quiz questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center border border-red-200">
        <h3 className="text-red-700 text-xl font-semibold mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchQuestions}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 text-lg">No questions available. Please run the backend seed script.</p>
      </div>
    );
  }

  if (isFinished) {
    return <ScoreBoard score={score} total={questions.length} onRestart={handleRestart} />;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
          Score: {score}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8 shadow-inner overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <QuestionCard 
        question={questions[currentQuestionIndex]} 
        selectedOption={selectedOption}
        onSelect={handleAnswerSelect}
        isRevealed={isAnswerRevealed}
      />

      <div className="mt-8 flex justify-end">
        {isAnswerRevealed && (
          <button 
            onClick={handleNext}
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
