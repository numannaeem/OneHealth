import React from 'react'
import { PageContainer, Footer, AdminNav } from '../Layout'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AdminCards from './AdminCards'
import NewDoctor from './NewDoctor'
import AllDoctors from './AllDoctors'
import AllPatients from './AllPatients'
import ViewAppointments from './ViewAppointments'

export default function AdminDashboard ({ userData }) {
  const navigate = useNavigate()
  if (!userData) {
    navigate('/login')
  }

  return (
    <PageContainer isFixedNav>
      <AdminNav name={userData.username} />
      <Routes>
        <Route
          path='/'
          element={
            <AdminCards />
          }
        />
        <Route path='/add-doctor' element={<NewDoctor />} />
        <Route path='/all-doctors' element={<AllDoctors />} />
        <Route path='/all-patients' element={<AllPatients />} />
        <Route path='/view-appointments' element={<ViewAppointments />} />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </PageContainer>
  )
}
