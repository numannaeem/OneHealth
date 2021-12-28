import { Box, Flex, Heading, Stack } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import baseUrl from '../../baseUrl'

function NewAppointment ({ userId }) {
  const toast = useToast()
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${baseUrl}/doctors`)
        if (res.ok) {
          const jsonRes = await res.json()
          setDoctors(jsonRes)
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        toast({
          title: 'Could not fetch doctors!',
          description: 'Please try again later',
          status: 'error',
          isClosable: true,
          duration: 3000
        })
      }
    }
    fetchDoctors()
  }, [toast])

  const handleChange = e => {
    let value = e.target.value
    if (e.target.name === 'doctorId') {
      const idx = e.target.selectedIndex
      value = doctors[idx - 1]._id // idx-1 cause of the "select one" option
    }
    setFormData(p => {
      p[e.target.name] = value
      return { ...p }
    })
  }
  const [formData, setFormData] = useState({
    datetime: '',
    description: '',
    doctorId: ''
  })

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${baseUrl}/patients/${userId}/appointments`, {
        method: 'POST',
        body: JSON.stringify({ ...formData, id: userId }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (res.ok) {
        toast({
          title: 'Appointment successfully added',
          description: 'The slot will by accepted/rejected by the admin',
          isClosable: true,
          duration: 4000,
          status: 'success'
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
            Book appointment
          </Heading>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.800')}
          shadow='xl'
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='doctorId' isRequired>
              <FormLabel>Doctor</FormLabel>
              <Select onChange={handleChange} name='doctorId'>
                <option selected disabled>
                  Select one
                </option>
                {doctors?.map(d => {
                  if (d.available)
                    return (
                      <option key={d._id} id={d._id}>
                        {d.name}, {d.specialization}
                      </option>
                    )
                  else return null
                })}
              </Select>
            </FormControl>
            <FormControl id='datetime' isRequired>
              <FormLabel>Date and time</FormLabel>
              <Input
                onChange={handleChange}
                value={formData.datetime}
                name='datetime'
                type='datetime-local'
              />
            </FormControl>
            <FormControl id='description' isRequired>
              <FormLabel>Reason for appointment</FormLabel>
              <Textarea
                onChange={handleChange}
                value={formData.description}
                name='description'
                type='text'
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Submitting'
                size='lg'
                colorScheme='yellow'
                onClick={handleSubmit}
              >
                Confirm Booking
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default NewAppointment
