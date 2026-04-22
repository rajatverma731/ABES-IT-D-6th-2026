import React from 'react';

const QuestionCard = ({ question, selectedOption, onSelect, isRevealed }) => {
  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          
          let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-lg font-medium ";
          
          if (!isRevealed) {
            buttonClass += "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 cursor-pointer";
          } else {
            // After answer is revealed
            if (option === question.correctAnswer) {
              buttonClass += "border-green-500 bg-green-50 text-green-700"; // Correct answer always green
            } else if (option === selectedOption) {
              buttonClass += "border-red-500 bg-red-50 text-red-700"; // Selected wrong answer is red
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-70 cursor-not-allowed";
            }
          }

          return (
            <button
              key={index}
              onClick={() => onSelect(option)}
              disabled={isRevealed}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isRevealed && option === question.correctAnswer && (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                )}
                {isRevealed && option === selectedOption && option !== question.correctAnswer && (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
