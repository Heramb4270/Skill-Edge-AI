"use client";
import {useState} from 'react'
import SideBar from '@/components/student/SideBar'
import Dashboard from '@/components/student/Dashboard'
import GenerateQuestion from '@/components/student/GenerateQuestion'
import StudentList from '@/components/student/StudentList'
import Resource from '@/components/student/Resource'
import Quizzes from '@/components/student/Quizzes';

export default function page() {
  const [tab, setTab] = useState('dashboard')

  
  return (
    <div>
        <SideBar tab={tab} setTab={setTab}>
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'generate' && <GenerateQuestion />}
            {tab === 'students' && <StudentList />}
            {tab === 'resource' && <Resource/>}
            {tab === 'quizzes' && <Quizzes />}
        </SideBar>
    </div>
  )
}

