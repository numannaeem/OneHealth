import React from 'react'
import { PageContainer, Footer } from '../Layout'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import DoctorCards from './DoctorCards'
import DoctorNav from '../Layout/Nav/DoctorNav'
import ViewDoctorAppointments from './ViewDoctorAppointments'

export default function DoctorDashboard ({ userData }) {
  const navigate = useNavigate()
  if (!userData) {
    navigate('/login')
  }

  return (
    <PageContainer isFixedNav>
      <DoctorNav name={userData.name} />
      <Routes>
        <Route
          path='/'
          element={
            <DoctorCards userData={userData} />
          }
        />
        <Route path='/view-appointments' element={<ViewDoctorAppointments userId={userData._id} />} />
        {/* <Route path='/add-doctor' element={<NewDoctor />} />
        <Route path='/all-doctors' element={<AllDoctors />} />
        <Route path='/all-patients' element={<AllPatients />} />
        <Route path='/view-appointments' element={<ViewAppointments />} /> */}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </PageContainer>
  )
}
