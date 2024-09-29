"use client";
import React, { useState, useEffect } from 'react';
import { CodeXml, Timer, ChevronRight } from 'lucide-react';

const questions = require("@/app/mcq/question.json");

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1200);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center px-4">
      <div className="w-[80%] h-[90vh] flex flex-col">
        <QuizHeader 
          title="Operating System" 
          noOfQuestions={questions.length} 
          time={formatTime(timeRemaining)}
        />
        <QuizProgress 
          current={currentQuestionIndex + 1} 
          total={questions.length}
        />
        {currentQuestionIndex < questions.length ? (
          <QuizQuestion
            questionNo={currentQuestionIndex + 1}
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onNext={handleNextQuestion}
          />
        ) : (
          <QuizResult score={score} total={questions.length} />
        )}
      </div>
    </div>
  );
};

const QuizHeader = ({ title, noOfQuestions, time }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-4 mb-4 flex justify-between items-center">
      <div className="flex items-center">
        <CodeXml className="text-yellow-400 w-10 h-10 mr-3" />
        <div>
          <h1 className="text-xl font-bold text-gray-100">{title}</h1>
          <p className="text-xs text-yellow-400">{noOfQuestions} Questions</p>
        </div>
      </div>
      <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
        <Timer className="text-yellow-400 w-5 h-5 mr-2" />
        <span className="text-lg font-semibold text-gray-100">{time}</span>
      </div>
    </div>
  );
};

const QuizProgress = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-400">Progress</span>
        <span className="text-xs font-medium text-yellow-400">{current} of {total} questions</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const QuizQuestion = ({ 
    questionNo, 
    question, 
    options, 
    selectedAnswer, 
    setSelectedAnswer, 
    onNext 
  }) => {
    return (
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <span className="text-xl font-bold text-gray-900">{questionNo}</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-100">{question}</h2>
        </div>
        <div className="space-y-3  mb-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded-lg border ${
                selectedAnswer === index 
                  ? 'border-yellow-400 bg-gray-700' 
                  : 'border-gray-700 bg-gray-750 hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-150 ease-in-out flex items-center`}
              onClick={() => setSelectedAnswer(index)}
            >
              <span className="text-yellow-400 font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button 
            className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out flex items-center"
            onClick={onNext}
          >
            Next Question
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    );
  };
  

const QuizResult = ({ score, total }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center flex-grow flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg mb-4">Your score: {score} out of {total}</p>
      <p className="text-yellow-400 text-xl font-semibold mb-6">
        {score === total ? "Perfect Score!" : score > total / 2 ? "Great Job!" : "Keep Practicing!"}
      </p>
      <button className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out mx-auto">
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizPage;