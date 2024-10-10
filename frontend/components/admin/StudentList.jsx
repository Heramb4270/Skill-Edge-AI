"use client";
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase'; 

export default function StudentList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map(doc => doc.data());
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Student List
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            List of students in different departments and years.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Mobile Number</th>
            <th scope="col" className="px-6 py-3">PRN</th>
            <th scope="col" className="px-6 py-3">Year</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </th>
              <td className="px-6 py-4">{user.department}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.mobileNumber}</td>
              <td className="px-6 py-4">{user.prn}</td>
              <td className="px-6 py-4">{user.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
