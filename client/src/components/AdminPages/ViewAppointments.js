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
  IconButton,
  Spinner
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import baseUrl from '../../baseUrl'

function ViewAppointments () {
  const toast = useToast()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const pendingColor = useColorModeValue('main.600', 'main.500')
  const tableColor = useColorModeValue('white', 'gray.800')

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

  if (loading) {
    return (
      <Flex grow='1' align='center' justify='center'>
        <Spinner color='main.500' size='lg' />
      </Flex>
    )
  }

  return (
    <Flex mt={5}>
      <Table
        shadow='md'
        borderRadius='md'
        bg={tableColor}
        variant='simple'
      >
        <TableCaption>Manage appointments</TableCaption>
        <Thead>
          <Tr>
            <Th>Patient</Th>
            <Th>Doctor</Th>
            <Th>Date &amp; time</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Accept/Reject</Th>
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
                      <Flex justify='space-evenly'>
                        <IconButton size='sm' variant='outline' colorScheme='red' icon={<SmallCloseIcon />} />
                        <IconButton size='sm' variant='outline' colorScheme='green' icon={<CheckIcon />} />
                      </Flex>
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
