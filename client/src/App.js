import LoginPage from './components/LoginPage'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import theme from './theme'
import Dashboard from './components/Dashboard'
import SignupPage from './components/SingupPage'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignupPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
