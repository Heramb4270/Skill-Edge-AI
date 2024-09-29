"use client";
import React from 'react';
import { Code,CodeXml, Timer } from 'lucide-react';
import { useState } from 'react';
import { IoEllipseSharp } from 'react-icons/io5';
const questions = require("@/app/mcq/question.json");
console.log(questions);
const QuizPage = () => {
    const [ans,setAnswer] = useState(null);
    const [index,setIndex] = useState(0);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="w-[80%] mx-auto"> 
        <QuizHeader title={"Operating System"} noOfQuestions={"20"} time={"20"}/>
        <QuizQuestion questionNo={index+1} question={questions[index].question} setAnswer={setAnswer} ans={ans} setIndex={setIndex} options={questions[index].options}/>

       

        {/* <QuizQuestion questionNo={/> */}
      </div>
    </div>
  );
};

const QuizHeader = (props) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 flex justify-between items-center">
      <div className="flex items-center">
        <CodeXml className="text-yellow-500 w-10 h-10 mr-4" />
        <div>
          <h1 className="text-2xl font-bold text-gray-100">{props.title}</h1>
          <p className="text-sm text-yellow-500">{props.noOfQuestions} Questions</p>
        </div>
      </div>
      <div className="flex items-center">
        <Timer className="text-yellow-500 w-6 h-6 mr-2" />
        <span className="text-xl font-semibold text-gray-100">00:00</span>
      </div>
    </div>
  );
};

const QuizQuestion = ({
    questionNo,
    question,
    setAnswer,
    ans,
    setIndex,
    options

}) =>{

    const [tempAns,setTempAns] = useState(null);  
    const handleAns = () => {
        if(tempAns !== null){
            setAnswer(tempAns);
            setIndex((prevIndex) => prevIndex + 1);
        }else{
            alert("Please select an option");
            
        }
    }  
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-gray-900">{questionNo}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-100">{question}</h2>
      </div>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left p-4 rounded-md border border-gray-700 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
            onClick={() => {setTempAns(index);}}
         >
            {String.fromCharCode(65 + index)}: {option}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
        onClick={handleAns}>
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;