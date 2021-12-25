import React from 'react'
import { SimpleGrid, Text, Flex } from '@chakra-ui/react'
import { PageContainer, PageContent, Nav, Footer, Card } from '../Layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PatientNav from '../Layout/Nav/PatientNav'
import PatientCards from './PatientCards'
import NewAppointment from './NewAppointment'

export default function PatientDashboard ({userData}) {

  const navigate = useNavigate()
  console.log(userData)
  if(!userData)
      navigate('/login')

  return (
    <PageContainer isFixedNav>
      <PatientNav name={userData.email} />
      <Routes>
        <Route path='/' element={<PatientCards />} />
        <Route path='/new-appointment' element={<NewAppointment />} />
      </Routes>
      <Footer />
    </PageContainer>
  )
}
