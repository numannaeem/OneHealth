import React from 'react'
import { PageContainer, Footer, AdminNav } from '../Layout'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AdminCards from './AdminCards'

export default function AdminDashboard ({ userData }) {
  const navigate = useNavigate()
  console.log(userData)
  if (!userData) { navigate('/login') }

  return (
    <PageContainer isFixedNav>
      <AdminNav name='Admin' />
      <Routes>
        <Route path='/' element={<AdminCards userData={userData} />} />
        {/* <Route
          path='/new-doctor'
          element={<NewAppointment doctors={doctors} userId={userData._id} />}
        /> */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </PageContainer>
  )
}
