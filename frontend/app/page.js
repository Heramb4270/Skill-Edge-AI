"use client";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import IntoBanner from "@/components/IntroBanner";
// import NavBar from "@/components/user/Navbar";
import Navbar from "@/components/user/NavBar";
import ProgressBar from "@/components/ProgressBar";
import Title from "@/components/Title";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setUsername(() => localStorage.getItem("name"));
      setIsLogged(() => true);
    } else {
      setUsername(() => null);
      setIsLogged(() => false);
    }

    getProgress();
  }, []);

  const getProgress = async () => {
    const user_id = localStorage.getItem("user_id");
    const totalModules = 6;

    const response = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, totalModules }),
    });

    const data = await response.json();
    setProgress(() => data.progress);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <IntoBanner username={username} />
      {/* <hr /> */}
      <div className="max-w-screen-xl mx-auto">
     
        <Title />
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            img={"/img2.jpg"}
            title={"Operating Systems Concepts (OS)"}
            link={isLogged ? "/training/phishing" : "/login"}
          />
          <Card
            img={"/img4.jpg"}
            title={"Database Management Systems"}
            link={isLogged ? "/training/pass-security" : "/login"}
          />
          <Card
            img={"/dataprotection.jpg"}
            title={"Data Structures and Algorithms"}
            link={isLogged ? "/training/data-protection" : "/login"}
          />
          <Card
            img={"/img6.jpg"}
            title={"Computer Networks Basics (CN)"}
            link={isLogged ? "/training/social-engg" : "/login"}
          />
          <Card
            img={"/incidence.jpg"}
            title={"Artificial Intelligence and Machine Learning"}
            link={isLogged ? "/training/incidence-res" : "/login"}
          />
          <Card
            img={"/remote.jpg"}
            title={"Web Development and Frameworks"}
            link={isLogged ? "/training/remote-work" : "/login"}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
