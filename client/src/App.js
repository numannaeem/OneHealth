import LoginPage from './components/LoginPage'
import { ChakraProvider, Spinner, Flex } from '@chakra-ui/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import theme from './theme'
import AdminDashboard from './components/AdminDashboard'
import SignupPage from './components/SingupPage'
import { useEffect, useState } from 'react'
import PatientDashboard from './components/PatientPages/PatientDashboard'
import baseUrl from './baseUrl'

function App () {
  const [userData, setUserData] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authUser = async () => {
      setLoading(true)
      const username = localStorage.getItem('username')
      const password = localStorage.getItem('password')
      const role = localStorage.getItem('role')
      if(username && password) {
        try {
          const res = await fetch(baseUrl + '/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username,
              password,
              role
            }),
            credentials:'include',
          })
          console.log(res)
          if(res.ok) {
            const jsonRes = await res.json()
            setUserData(jsonRes)
            setLoggedIn(true)
          }
        } catch (error) {
          setLoggedIn(false)
        }
      }
      setLoading(false)
    }
    authUser()
  }, [])

  if(loading)
    return (
    <ChakraProvider theme={theme}>
      <Flex minH='100vh' justify='center' align='center'>
        <Spinner size={'xl'} />
      </Flex>
</ChakraProvider>
    )

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={loggedIn ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
          {!loggedIn && <Route
            path='/login'
            element={<LoginPage setUserData={setUserData} />}
          />}
          <Route path='/register' element={<SignupPage />} />
          {userData && (
            <Route
              path='/dashboard/*'
              element={
                userData.role === 'admin' ? (
                  <AdminDashboard userData={userData} />
                ) : (
                  <PatientDashboard userData={userData} />
                )
              }
            />
          )}
          <Route path='/:anythingElse' element={loggedIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
