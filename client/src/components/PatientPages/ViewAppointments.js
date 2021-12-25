import { Flex } from '@chakra-ui/layout'
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
import React, { useEffect, useState } from 'react'
import baseUrl from '../../baseUrl'

function ViewAppointments ({ userId }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/patients/${userId}/appointments`)
        if (res.ok) {
          const jsonRes = await res.json()
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
      <Table shadow='md' borderRadius={'md'} bg={useColorModeValue('white', 'gray.800')} variant='simple'>
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
                  ? 'Pending'
                  : a.status === 'R'
                  ? 'Rejected'
                  : 'Approved'}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default ViewAppointments
