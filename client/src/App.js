import LoginPage from './components/LoginPage'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <LoginPage />
    </ChakraProvider>
  )
}

export default App
