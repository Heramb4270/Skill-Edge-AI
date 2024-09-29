"use client"; // For Vercel deployment
import React, { useState } from 'react';
import { firestore } from '@/firebase/firebase'; // import firestore configuration
import { collection, addDoc } from 'firebase/firestore'; // For Firestore database
import Router from 'next/router';``

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    prn: '',
    year: '',
    mobileNumber: '',
    department: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with a generated ID
      await addDoc(collection(firestore, 'users'), {
        email: formData.email,
        name: formData.name,
        prn: formData.prn,
        year: formData.year,
        mobileNumber: formData.mobileNumber,
        department: formData.department,
        password: formData.password, // In real apps, NEVER store plain text passwords!
      });

      alert('User data stored successfully in Firestore!');
      Router.push('/auth/login');
    } catch (error) {
      console.error('Error storing user data:', error);
      alert('Failed to store data in Firestore');
    }
  };

  return (
    <div className="m-20">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
            SkillEdge AI
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="prn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      PRN
                    </label>
                    <input
                      type="text"
                      name="prn"
                      id="prn"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                      placeholder="12320083"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Year
                    </label>
                    <select
                      name="year"
                      id="year"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                      required
                    >
                      <option value="" disabled selected>
                        Select your year
                      </option>
                      <option value="1">First Year</option>
                      <option value="2">Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Fourth Year</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                      placeholder="9876543210"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select Department
                    </label>
                    <select
                      name="department"
                      id="department"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                      required
                    >
                      <option value="" disabled selected>
                        Select Department
                      </option>
                      <option value="AIDS">AIDS</option>
                      <option value="CS">CS</option>
                      <option value="IT">IT</option>
                      <option value="ENTC">ENTC</option>
                      <option value="CS(AI)">CS(AI)</option>
                      <option value="CS(AIML)">CS(AIML)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <a href="/auth/login" className="font-medium text-orange-600 hover:underline dark:text-orange-500">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
