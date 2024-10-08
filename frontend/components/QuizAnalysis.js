"use client"
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const quizResults = {
  "Accuracy by Difficulty": {
    "easy": 50.0,
    "hard": 100.0,
    "medium": 50.0
  },
  "Overall Accuracy": 50.0,
  "References": {
    "books": [
      "Operating System Concepts by Silberschatz, Galvin, and Gagne",
      "Modern Operating Systems by Andrew S. Tanenbaum"
    ],
    "online resources": [
      "https://www.tutorialspoint.com/operating_system",
      "https://www.geeksforgeeks.org/operating_systems/"
    ]
  },
  "Strengths": [
    "Operating system functions",
    "Types of operating systems",
    "Process in operating system",
    "File system purpose",
    "File and directory difference"
  ],
  "Weaknesses": [
    "Command-line interface (CLI)",
    "Graphical user interface (GUI)",
    "Multitasking",
    "Memory management unit (MMU)",
    "Virtual machine"
  ],
  "Suggestion_For_Improvement": "Focus on the concepts related to command-line interface, graphical user interface, multitasking, memory management unit, and virtual machines. Utilize the provided references for a deeper understanding of these topics.",
  "Total Correct Answers": 5,
  "Total Incorrect Answers": 5
};

export default function QuizAnalysis() {
  const accuracyData = {
    labels: Object.keys(quizResults["Accuracy by Difficulty"]),
    datasets: [
      {
        label: 'Accuracy',
        data: Object.values(quizResults["Accuracy by Difficulty"]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const overallData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Answers",
        data: [quizResults["Total Correct Answers"], quizResults["Total Incorrect Answers"]],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Results</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Accuracy by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={accuracyData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>Total Questions: {quizResults["Total Correct Answers"] + quizResults["Total Incorrect Answers"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Pie data={overallData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {quizResults.Strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {quizResults.Weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suggestion for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{quizResults.Suggestion_For_Improvement}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Books:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {quizResults.References.books.map((book, index) => (
                  <li key={index}>{book}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Online Resources:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {quizResults.References["online resources"].map((resource, index) => (
                  <li key={index}>
                    <a href={resource} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
      <button 
            className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out flex items-center"
            
          >
            Retake Quiz
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
      </div>
    </div>
  );
}