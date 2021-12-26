import React from 'react'
import { PageContainer, Footer } from '../Layout'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import PatientNav from '../Layout/Nav/PatientNav'
import PatientCards from './PatientCards'
import NewAppointment from './NewAppointment'
import ViewAppointments from './ViewAppointments'
import DoctorDetails from './DoctorDetails'

export default function PatientDashboard ({ userData, doctors }) {
  const navigate = useNavigate()
  if (!userData) navigate('/login')

  return (
    <PageContainer isFixedNav>
      <PatientNav name={userData.name} />
      <Routes>
        <Route path='/' element={<PatientCards userData={userData} />} />
        <Route
          path='/new-appointment'
          element={<NewAppointment doctors={doctors} userId={userData._id} />}
        />
        <Route
          path='/appointments'
          element={<ViewAppointments userId={userData._id} />}
        />
        <Route
          path='/doctors'
          element={<DoctorDetails userId={userData._id} />}
        />
        <Route path='/:anythingElse' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </PageContainer>
  )
}
