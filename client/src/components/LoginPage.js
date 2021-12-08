import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/select'
import { useState } from 'react'

export default function LoginPage () {
  // local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accType, setAccType] = useState(null)

  // colors
  const textColor = useColorModeValue('green.700', 'green.100')

  // dark mode toggle button
  // const colorMode = window.localStorage.getItem('chakra-ui-color-mode')
  // const { toggleColorMode } = useColorMode()
  // const ColorModeToggleButton = props => {
  //   if (colorMode === 'dark') {
  //     return <SunIcon {...props} onClick={toggleColorMode} />
  //   } else {
  //     return <MoonIcon {...props} onClick={toggleColorMode} />
  //   }
  // }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Stack spacing={7} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align={['flex-start', 'center']}>
          <Heading color={textColor} fontSize='4xl'>
            Welcome to OneHealth
          </Heading>
          <Text fontSize='lg' color='gray.500'>
            sign in to get started!
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <Stack spacing={3}>
            <FormControl id='accountType'>
              <FormLabel>User type</FormLabel>
              <Select
                onChange={e => setAccType(e.target.value)}
                placeholder='Select option'
              >
                <option value='doctor'>Doctor</option>
                <option value='patient'>Patient</option>
                <option value='admin'>Admin</option>
              </Select>
            </FormControl>
            {accType !== 'admin' && (
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </FormControl>
            )}
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='password'
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align='start'
                justify='space-between'
              >
                <Checkbox colorScheme='green'>Remember me</Checkbox>
                <Link color={textColor}>Forgot password?</Link>
              </Stack>
              <Button colorScheme='green'>Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
