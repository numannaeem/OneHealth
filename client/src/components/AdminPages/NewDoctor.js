import { Box, Flex, Heading, HStack, Stack } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import baseUrl from '../../baseUrl'

function NewDoctor () {
  const toast = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    specialization: '',
    available: '',
    qualifications: '',
    experience: '',
    DOB: ''
  })

  const handleChange = e => {
    let value = e.target.value
    if (e.target.name === 'available') {
      value = e.target.value === 'Available'
    }

    setFormData(p => {
      p[e.target.name] = value
      return { ...p }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const quals = formData.qualifications
    const qualArr = quals.split(',')

    try {
      const res = await fetch(`${baseUrl}/doctors/`, {
        method: 'POST',
        body: JSON.stringify({ ...formData, qualifications: qualArr }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (res.ok) {
        toast({
          title: 'Doctor added successfully',
          isClosable: true,
          duration: 4000,
          status: 'success'
        })
        setFormData({
          email: '',
          password: '',
          name: '',
          specialization: '',
          available: '',
          qualifications: '',
          experience: '',
          DOB: ''
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Please try again later',
        isClosable: true,
        duration: 4000,
        status: 'error'
      })
    }
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      // bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl' textAlign='center'>
            Add doctor
          </Heading>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.800')}
          shadow='xl'
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

              <FormControl id='description' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={handleChange}
                  value={formData.email}
                  name='email'
                  type='email'
                />
              </FormControl>

              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={handleChange}
                  value={formData.password}
                  name='password'
                  type='password'
                />
              </FormControl>

              <FormControl id='specialization' isRequired>
                <FormLabel>Specialization</FormLabel>
                <Input
                  onChange={handleChange}
                  value={formData.specialization}
                  name='specialization'
                  type='text'
                />
              </FormControl>

              <FormControl id='available' isRequired>
                <FormLabel>Availability</FormLabel>
                <Select onChange={handleChange} name='available'>
                  <option selected disabled>
                    Select one
                  </option>
                  <option>Available</option>
                  <option>Unavailable</option>
                </Select>
              </FormControl>

              <FormControl id='qualifications' isRequired>
                <FormLabel>
                  Qualifications (Enter comma seperated values)
                </FormLabel>
                <Input
                  placeholder='Eg: MBBS,MD'
                  onChange={handleChange}
                  value={formData.qualifications}
                  name='qualifications'
                  type='text'
                />
              </FormControl>

              <HStack>
                <FormControl id='DOB' isRequired>
                  <FormLabel>Date of birth</FormLabel>
                  <Input
                    onChange={handleChange}
                    value={formData.DOB}
                    name='DOB'
                    type='date'
                  />
                </FormControl>
                <FormControl id='experience' isRequired>
                  <FormLabel>Experience (in years)</FormLabel>
                  <Input
                    onChange={handleChange}
                    value={formData.experience}
                    name='experience'
                    type='number'
                  />
                </FormControl>

              </HStack>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  colorScheme='yellow'
                  onClick={handleSubmit}
                >
                  Add Doctor
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default NewDoctor
