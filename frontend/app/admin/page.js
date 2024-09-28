"use client";
import {useState} from 'react'
import SideBar from '@/components/admin/SideBar'
import Dashboard from '@/components/admin/Dashboard'
import GenerateQuestion from '@/components/admin/GenerateQuestion'

export default function page() {
  const [tab, setTab] = useState('dashboard')
  return (
    <div>
        <SideBar tab={tab} setTab={setTab}>
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'generate' && <GenerateQuestion />}
        </SideBar>
    </div>
  )
}
