import React from 'react';

const ScoreBoard = ({ score, total, onRestart }) => {
  const percentage = (score / total) * 100;
  
  let message = "";
  if (percentage === 100) message = "Perfect Score! You're a genius 🧠";
  else if (percentage >= 80) message = "Excellent Job! 🌟";
  else if (percentage >= 50) message = "Good effort, but room for improvement 👍";
  else message = "Keep learning, you'll get it next time! 📚";

  return (
    <div className="text-center py-10 px-6">
      <div className="mb-8">
        <svg className="w-24 h-24 mx-auto text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-500 text-lg">{message}</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100 shadow-inner">
        <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Final Score</div>
        <div className="text-6xl font-black text-indigo-600">
          {score}<span className="text-3xl text-gray-400 font-bold">/{total}</span>
        </div>
      </div>

      <button 
        onClick={onRestart}
        className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-95 text-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ScoreBoard;
