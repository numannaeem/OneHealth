import { Flex, Text } from '@chakra-ui/layout'
import {
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
  const pendingColor = useColorModeValue('main.600', 'main.500')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/patients/${userId}/appointments`)
        if (res.ok) {
          const jsonRes = await res.json()
          jsonRes.sort((a, b) => (a.datetime > b.datetime ? 1 : -1))
          setAppointments(jsonRes)
          console.log(jsonRes)
        }
      } catch (error) {
        alert(error)
      }
    }

    fetchData()
  }, [userId])

  return (
    <Flex mt={5}>
      <Table
        shadow='md'
        borderRadius='md'
        bg={useColorModeValue('white', 'gray.800')}
        variant='simple'
      >
        <TableCaption>All appointments</TableCaption>
        <Thead>
          <Tr>
            <Th>Doctor</Th>
            <Th>Date &amp; time</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map(a => (
            <Tr>
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
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default ViewAppointments
