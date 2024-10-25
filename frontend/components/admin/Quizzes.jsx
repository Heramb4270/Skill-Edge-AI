"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/db";
import { MdQuiz } from "react-icons/md";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const snapshot = await db.collection("quizzes").get();
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(data);
            // Output:
            //             0
            // :
            // {id: 'J6YYcjtI6VQzZf0vFnAX', questions: Array(5), name: 'Computer Network Numerical'}
            // 1
            // :
            // {id: 'X7WSOcW05KwntUYP05hK', questions: Array(2), name: 'gfhfghg'}
            // 2
            // :
            // {id: 'alCCScdsmMDoH613YKDU', name: 'sdfsdf', questions: Array(2)}
            // 3
            // :
            // {id: 'an7RHQqTY9Asam4pSw6k', questions: Array(6), name: 'Demo'}
            // 4
            // :
            // {id: 'jlx7dGCWNNx9ffuWmZhM', name: 'Database Quiz', questions: Array(6)}
            setQuizzes(data);
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg">
            <h1 className="text-2xl font-bold">Quizzes</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
                {quizzes.map((quiz) => (
                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-2xl hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
                        <MdQuiz className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {quiz.name}
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                            No of questions: {quiz.questions.length}
                        </p>
                        <div class="flex items-center mt-4">
                            <button
                                type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                View
                            </button>
                            <button
                                type="button"
                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Analyze
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
