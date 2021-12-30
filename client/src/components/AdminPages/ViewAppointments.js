import { CheckIcon, SmallCloseIcon, TimeIcon } from '@chakra-ui/icons'
import {
  Table,
  useToast,
  Flex,
  useColorModeValue,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  IconButton,
  Spinner
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import baseUrl from '../../baseUrl'

function ViewAppointments () {
  const toast = useToast()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const pendingColor = useColorModeValue('main.600', 'main.500')
  const tableColor = useColorModeValue('white', 'gray.800')

  const handleStatusChange = async (status, app) => {
    try {
      const reqBody = {
        datetime: app.datetime,
        description: app.description,
        status: 'R'
      }
      if (status === 'accept') {
        reqBody.status = 'A'
      }
      const res = await fetch(
        `${baseUrl}/patients/${app.patient._id}/appointments/${app._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqBody)
        }
      )
      if (res.ok) {
        toast({ title: 'Successfully changed', status: 'success', duration: 4000 })
        setApps(prev => prev.map(a => {
          if (a._id === app._id) {
            a.status = reqBody.status
          }
          return a
        }))
      }
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Could not change appointment status',
        status: 'error',
        isClosable: true,
        duration: 4000
      })
    }
  }

  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/appointments`)
        if (res.ok) {
          const jsonRes = await res.json()
          console.log(jsonRes)
          setApps(jsonRes)
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        toast({
          title: 'Could not fetch appointments!',
          description: 'Please try again later',
          status: 'error',
          isClosable: true,
          duration: 3000
        })
      }
      setLoading(false)
    }
    fetchApps()
  }, [toast])

  const deleteApp = async app => {
    try {
      const res = await fetch(
        `${baseUrl}/patients/${app.patient._id}/appointments/${app._id}`,
        {
          method: 'DELETE'
        }
      )
      if (res.ok) {
        toast({ title: 'Successfully deleted', status: 'success', duration: 4000 })
        setApps(prev => prev.filter(a => a._id !== app._id))
      }
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        description: 'Could not delete appointment',
        status: 'error',
        isClosable: true,
        duration: 4000
      })
    }
  }

  if (loading) {
    return (
      <Flex grow='1' align='center' justify='center'>
        <Spinner color='main.500' size='lg' />
      </Flex>
    )
  }

  return (
    <Flex mt={5}>
      <Table shadow='md' borderRadius='md' bg={tableColor} variant='simple'>
        <TableCaption>Manage appointments</TableCaption>
        <Thead>
          <Tr>
            <Th>Patient</Th>
            <Th>Doctor</Th>
            <Th>Date &amp; time</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Accept/Reject</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {apps.length > 0
            ? (
                apps.map(a => (
                  <Tr key={a._id}>
                    <Td>{a.patient.name}</Td>
                    <Td>{a.doctor.name}</Td>
                    <Td>{new Date(a.datetime).toLocaleString('en-US')}</Td>
                    <Td>{a.description}</Td>
                    <Td textAlign='center'>
                      {a.status === 'P'
                        ? (
                          <TimeIcon color={pendingColor} />
                          )
                        : a.status === 'R'
                          ? (
                            <SmallCloseIcon color='red' />
                            )
                          : (
                            <CheckIcon color='green' />
                            )}
                    </Td>
                    <Td>
                      {a.status === 'P'
                        ? (
                          <Flex justify='space-evenly'>
                            <IconButton
                              onClick={() => handleStatusChange('reject', a)}
                              size='sm'
                              variant='outline'
                              colorScheme='red'
                              icon={<SmallCloseIcon />}
                            />
                            <IconButton
                              onClick={() => handleStatusChange('accept', a)}
                              size='sm'
                              variant='outline'
                              colorScheme='green'
                              icon={<CheckIcon />}
                            />
                          </Flex>
                          )
                        : <Text textAlign='center' color='gray.600'>—</Text>}
                    </Td>
                    <Td textAlign='center'>
                      <IconButton
                        onClick={() => deleteApp(a)}
                        variant='ghost'
                        color='red'
                        icon={<MdDeleteOutline />}
                      />
                    </Td>
                  </Tr>
                ))
              )
            : (
              <Tr>
                <Td textAlign='center'>No appointments on the database</Td>
              </Tr>
              )}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default ViewAppointments
