import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  Textarea
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import baseUrl from '../baseUrl'
import { useNavigate } from 'react-router-dom'

export default function SignupPage () {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    email: '',
    address: '',
    password: '',
    mobile: ''
  })

  const btnColor = useColorModeValue('yellow.300', 'yellow.400')

  const handleChange = e => {
    e.preventDefault()
    let value = e.target.value
    if (e.target.name === 'gender') {
      value = value.toLowerCase()
      console.log(value)
    }
    setFormData(p => {
      p[e.target.name] = value
      return { ...p }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch(baseUrl + '/patients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          role: 'patient'
        })
      })
      if (res.ok) {
        localStorage.setItem('oneHealth', JSON.stringify({
          username: formData.email,
          password: formData.password,
          role: 'patient'
        }))
        window.location.replace('/dashboard')
      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl' textAlign='center'>
            Sign up
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            to enjoy all of our services ✌️
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={handleChange}
                  value={formData.name}
                  name='name'
                  type='text'
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id='email' isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      onChange={handleChange}
                      value={formData.email}
                      name='email'
                      type='email'
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id='mobile' isRequired>
                    <FormLabel>Mobile</FormLabel>
                    <Input
                      pattern='[0-9]{10}'
                      onChange={handleChange}
                      value={formData.mobile}
                      name='mobile'
                      type='tel'
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id='address' isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea
                  onChange={handleChange}
                  value={formData.address}
                  name='address'
                  type='text'
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    value={formData.password}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h='full'>
                    <Button
                      variant='ghost'
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id='age' isRequired>
                    <FormLabel>Age</FormLabel>
                    <Input
                      onChange={handleChange}
                      value={formData.age}
                      name='age'
                      type='number'
                    />
                  </FormControl>
                </Box>
                <Box flexGrow={1}>
                  <FormControl id='gender'>
                    <FormLabel>Gender</FormLabel>
                    <Select onChange={handleChange} name='gender'>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <Stack spacing={5} pt={3}>
                <Button
                  loadingText='Submitting'
                  bgColor={btnColor}
                  colorScheme='yellow'
                  type='submit'
                >
                  Sign up
                </Button>

                <Text align='center'>
                  Already a user?{' '}
                  <Link href='/login' color='blue.400'>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
