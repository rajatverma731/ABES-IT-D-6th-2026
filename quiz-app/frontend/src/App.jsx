import React from 'react';
import Quiz from './components/Quiz.jsx';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-indigo-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold tracking-wider">React MERN Quiz</h1>
        </header>
        <main className="p-6 md:p-10">
          <Quiz />
        </main>
      </div>
    </div>
  );
}

export default App;
