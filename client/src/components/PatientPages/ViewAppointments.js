import { Flex, Text } from '@chakra-ui/layout'
import {
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import { TimeIcon, SmallCloseIcon, CheckIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import baseUrl from '../../baseUrl'

function ViewAppointments ({ userId }) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const pendingColor = useColorModeValue('main.600', 'main.500')
  const tableColor = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/patients/${userId}/appointments`)
        if (res.ok) {
          const jsonRes = await res.json()
          jsonRes.sort((a, b) => (a.datetime > b.datetime ? 1 : -1))
          setAppointments(jsonRes)
        }
      } catch (error) {
        alert(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [userId])

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
        <TableCaption>Your appointments</TableCaption>
        <Thead>
          <Tr>
            <Th>Doctor</Th>
            <Th>Date &amp; time</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.length > 0
            ? (
                appointments.map(a => (
                  <Tr key={a._id}>
                    <Td>{a.doctor.name}</Td>
                    <Td>{new Date(a.datetime).toLocaleString('en-US')}</Td>
                    <Td>{a.description}</Td>
                    <Td>
                      {a.status === 'P'
                        ? (
                          <Text color={pendingColor}>
                            <TimeIcon /> Pending
                          </Text>
                          )
                        : a.status === 'R'
                          ? (
                            <Text color='red'>
                              <SmallCloseIcon /> Rejected
                            </Text>
                            )
                          : (
                            <Text color='green'>
                              <CheckIcon /> Accepted
                            </Text>
                            )}
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
