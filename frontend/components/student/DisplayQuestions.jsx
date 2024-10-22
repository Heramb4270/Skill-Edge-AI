"use client";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
import { db } from "@/firebase/db";
import { ImSpinner3 } from "react-icons/im";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";
import { useRouter } from "next/navigation";

export default function DisplayQuestions({ questions, setQuestions }) {
    const router = useRouter();
    const [quizName, setQuizName] = useState("");
    const [saving, setSaving] = useState(false);
    const [exportType, setExportType] = useState("CSV");

    const handleSave = async () => {
        setSaving(true);
        try {

            await db.collection("student_quizzes").add({
                name: quizName,
                questions,
              })
              .then((docRef) => {
                // Get the document ID
                const quizId = docRef.id;
              
                // Navigate to the new quiz page
                router.push(`/mcq_practise/${quizId}`);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
              
        } catch (error) {
            console.error("Error saving quiz:", error);
            toast.error("Failed to save quiz");
        } finally {
            setSaving(false);
        }
    };



    return (
        <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Give Test Questions are Generated
                    
                    <div className="flex items-center mt-2">
                      
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={handleSave}
                        >
                            {saving ? <ImSpinner3 className="animate-spin" /> : "Give Test"}
                        </button>
                    </div>
                    {/* Export Section */}
                   
                </caption>

            </table>
        </div>
    );
}
