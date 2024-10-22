"use client";
import React, { useState, useEffect } from 'react';
import { CodeXml, Timer, ChevronRight } from 'lucide-react';
import {QuizAnalysis} from "@/components/QuizAnalysis";
import { db } from '@/firebase/db'; // Adjust the path as needed
import { collection, getDocs,addDoc } from 'firebase/firestore';
// const questions = require("@/app/mcq/question.json");

import { useRouter } from 'next/navigation';
const QuizPage = ({params}) => {
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1200);
  const [questionsCorrect, setQuestionsCorrect] = useState([]);
  const [incorrectQuestion,setIncorrectQuestion] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const quizDoc = db.collection("student_quizzes").doc(params.id);
      quizDoc.onSnapshot((doc) => {
        if (doc.exists) {
          const data2 = doc.data();
          setData(data2);  // Directly set the document data

          console.log("Data inside onSnapshot: ", data2); // This logs the new data immediately
          setLoading(false);
        } else {
          console.error("No such document!");
        }
      });
    } catch (err) {
      console.error("Error fetching quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [params.id]);

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuestionsCorrect([]);
    setTimeRemaining(1200);
    window.location.reload();

    
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer.includes(data.questions[currentQuestionIndex].answer)) {
        setScore((score)=>score + 1);
        setQuestionsCorrect((questionsCorrect) => [...questionsCorrect, currentQuestionIndex]);
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
      
      {loading && <div>Loading...</div>}
      {!loading && data!=null &&
      <div className="w-[80%] h-[90vh] flex flex-col">
      { console.log("Hello")}
        <QuizHeader 
          title={"Temp Name"} 
          noOfQuestions={data.questions.length} 
          time={formatTime(timeRemaining)}
        />
        <QuizProgress 
          current={currentQuestionIndex } 
          total={data.questions.length}
        />
        {currentQuestionIndex < data.questions.length ? (
          <QuizQuestion
            questionNo={currentQuestionIndex + 1}
            question={data.questions[currentQuestionIndex].question}
            options={data.questions[currentQuestionIndex].options}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onNext={handleNextQuestion}
            
          />
        ) : (
          <QuizResult quiz={data} setIncorrectQuestion={setIncorrectQuestion} incorrectQuestion ={incorrectQuestion} data={data} questionsCorrect={questionsCorrect} score2={score} total={data.questions.length} restartQuiz={handleRestartQuiz}/>
        )}
      </div>
}
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
              onClick={() => setSelectedAnswer(option)}
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
  

const QuizResult = ({ score2, total,questionsCorrect,restartQuiz,data,incorrectQuestion,setIncorrectQuestion,quiz }) => {
  const router = useRouter();
  const [correctQuestions,setCorrectQuestions] = useState([]);
  const [incorrectQuestions,setIncorrectQuestions] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  // const [quizAnalysis,setQuizAnalysis] = useState(null);
  const handleAnalysis = () => {
    // router.push(`/quiz-analysis/${data.id}`);
    console.log("Correct Questions are ",questionsCorrect);
    console.log("Incorrect Questions are ",incorrectQuestion);
    const correctQuestions2 = questionsCorrect.map((question) => data.questions[question]);
    const incorrectQuestions2 = incorrectQuestion.map((question) => data.questions[question]);
    setCorrectQuestions(correctQuestions);
    setIncorrectQuestions(incorrectQuestions);
    const quizName = data.name;
    const noOfQuestions = data.questions.length;
    setLoading(true);
    setError(null);
 
      // store quiz analysis data on firebase

      /* storeQuizAnalysis data on firebase */
      
        const handleQuizAnalysis = async (quizAnalysis) => {
            try {
              console.log("Storing Quiz Analysis data");
              console.log("Correct Questions are ",correctQuestions2);
              console.log("Incorrect Questions are ",incorrectQuestions2);
              console.log("Quiz Name is ",quizName);
                const docRef = await addDoc(collection(db, "quiz-analysis"), quizAnalysis);
                console.log("Document written with ID: ", docRef.id);
                router.push(`/quiz-analysis/${docRef.id}`);
            } catch (e) {
                console.error("Error adding document: ", e);
            } finally {
                console.log("Quiz Analysis data stored successfully");
            }
        }
        
 
    const QuizAnalysis = async () => {
      
            // Prepare the request payload
            const requestBody = {
                "quiz":quizName,
                "no_of_questions":noOfQuestions,
                "correct_questions": correctQuestions2,
                "incorrect_questions": incorrectQuestions2,
            };

            try {
                const response = await fetch(
                    "http://localhost:5000/analyze_quiz",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to generate questions.");
                }

                const data = await response.json();
                console.log(data);
                handleQuizAnalysis(data);
                // Assuming you have setQuestions in your state
                return;
            } catch (error) {
                console.error(error.message);
              setError(error.message);

            } finally {
              setLoading(false);
          }
        }
        QuizAnalysis();
  }

  useEffect(() => {
    // console.log(questionsCorrect);
    handleIncorrectQuestion();
  },[]);
  const handleIncorrectQuestion = () => {
    setIncorrectQuestion(data.questions.map((question,index) => {
      if(!questionsCorrect.includes(index)){
        return index;
      }
    }
    ));
  }
  return (
    <>
    {loading && <div>Loading...</div>}
    {!loading &&

   
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-center flex-grow flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg mb-4">Your score: {score2} out of {total}</p>
      <p className="text-yellow-400 text-xl font-semibold mb-6">
        {score2 === total ? "Perfect Score!" : score2 > total / 2 ? "Great Job!" : `Keep Practicing!`}
        
      </p>
      {/* <p className="text-gray-100 text-sm mb-6">Correct Questions are {questionsCorrect.map((question) => question).join(",")}</p> */}
      {/* <p className="text-gray-100 text-sm mb-6">Incorrect Correct Questions are {incorrectQuestion} </p> */}
      <button className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ase-in-out mx-auto"
      onClick={restartQuiz}>
        Restart Quiz
      </button>
      <button className="bg-yellow-400 mt-5 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out mx-auto"
      onClick={handleAnalysis}>
        View Analysis
      </button>
    </div>
  }
  </>
  );
};

export default QuizPage;