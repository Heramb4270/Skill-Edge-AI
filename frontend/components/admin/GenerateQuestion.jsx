"use client";
import { useState } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

export default function GenerateQuestion() {
    const [topic, setTopic] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [difficultyLevel, setDifficultyLevel] = useState("Easy");
    const [file, setFile] = useState(null); // If needed for the file upload option
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]); // To store the questions
    const [tab, setTab] = useState("prompt");

    const handleGenerateQuestions = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://localhost:5000/generate_question",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        topic,
                        no_of_questions: numberOfQuestions,
                        difficulty: difficultyLevel,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to generate questions.");
            }

            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">Generate Questions</h1>
            <p className="text-gray-500 mb-3">
                Generate questions based on the topic you provide or upload a
                file containing the syllabus or reference.
            </p>

            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-center p-4 border-b-2 ${
                                tab === "prompt"
                                    ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 "
                            } rounded-t-lg group`}
                            onClick={() => setTab("prompt")}
                        >
                            <MdGeneratingTokens
                                className={`w-5 h-5 me-2 ${
                                    tab === "prompt"
                                        ? "text-orange-600 dark:text-orange-500"
                                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                }`}
                            />
                            Using Prompt
                        </a>
                    </li>
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-flex items-center justify-center p-4 border-b-2 ${
                                tab === "file"
                                    ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 "
                            } rounded-t-lg group`}
                            aria-current="page"
                            onClick={() => setTab("file")}
                        >
                            <FaFileAlt
                                className={`w-5 h-5 me-2 ${
                                    tab === "file"
                                        ? "text-orange-600 dark:text-orange-500"
                                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                }`}
                            />
                            Using File
                        </a>
                    </li>
                </ul>
            </div>

            {tab === "prompt" ? (
                <div className="mb-3">
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Topic
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Write the topic here on which you want to generate questions"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    ></textarea>
                </div>
            ) : (
                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                    >
                        Upload Syllabus/Reference
                    </label>
                    <input
                        id="file_input"
                        type="file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="mb-3">
                    <label
                        htmlFor="number-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select number of questions
                    </label>
                    <input
                        type="number"
                        id="number-input"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Enter number of questions"
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="difficulty-level"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Select difficulty level
                    </label>
                    <select
                        id="difficulty-level"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        value={difficultyLevel}
                        onChange={(e) => setDifficultyLevel(e.target.value)}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            <button
                type="button"
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                onClick={handleGenerateQuestions}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <CgSpinner className="animate-spin inline-block w-5 h-5 me-2" />
                        Generating Questions...
                    </>
                ) : (
                    "Generate Questions"
                )}
            </button>

            {/* Display Questions */}
            {error && <div className="text-red-500">{error}</div>}
            {questions.length > 0 && (
                <div className="mt-5">
                    <h2 className="text-xl font-bold mb-4">
                        Generated Questions:
                    </h2>
                    <ul className="list-decimal list-inside">
                        {questions.map((question, index) => (
                            <li key={index}>
                                <p className="font-medium">
                                    {question.question}
                                </p>
                                <ul className="list-disc list-inside pl-5">
                                    {question.options.map((option, i) => (
                                        <li key={i}>{option}</li>
                                    ))}
                                </ul>
                                <p className="text-green-600">
                                    Answer: {question.answer}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
