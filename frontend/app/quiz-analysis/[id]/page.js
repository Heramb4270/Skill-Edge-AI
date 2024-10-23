"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import QuizAnalysis from '@/components/QuizAnalysis'
import { collection, getDocs, } from "firebase/firestore";
import { db } from '@/firebase/firebase';
export default function page({params}) {
  const [resources, setResources] = useState([]);
  const [analysis,setAnalysis] = useState(null);
  const [loading,setLoading] = useState(true);
  // console.log(params.id);
  useEffect(() => {
    // fetchResources2();
    getServerData();

  }, []);
  const fetchResources2 = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "quiz-analysis"));
      const fetchedResources = querySnapshot.docs?.map((doc) => doc);
      setResources(fetchedResources);
      console.log(fetchedResources);

    } catch (error) {
      console.error("Error fetching resources: ", error);
    }

  };

  async function getServerData() {
    // const db = getFirestore(app);
    setLoading(true);

    const querySnapshot = await getDocs(collection(db, "quiz-analysis"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setLoading(false);
    setAnalysis(data.filter((data)=>data.id == params.id));
    console.log("data is "+ data);
     // Data will be available as props in your component
  }
  return (
    <>
    {loading && <div> Loading ...</div>}
    {!loading && <div><QuizAnalysis analysis={analysis}/></div>}
    
    </>
  )
}
