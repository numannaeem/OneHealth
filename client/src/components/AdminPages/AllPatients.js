import {
  IconButton,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import baseUrl from '../../baseUrl'
import { MdDeleteOutline } from 'react-icons/md'

function AllPatients () {
  const tableColor = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/patients`)
        if (res.ok) {
          const jsonRes = await res.json()
          console.log(jsonRes)
          setPatients(jsonRes)
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        toast({
          title: 'Could not fetch patients!',
          description: 'Please try again later',
          status: 'error',
          isClosable: true,
          duration: 3000
        })
      }
      setLoading(false)
    }
    fetchPatients()
  }, [toast])

  const deletePatient = async patientId => {
    try {
      const res = await fetch(`${baseUrl}/patients/${patientId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (res.ok) {
        setPatients(prev => prev.filter(p => p._id !== patientId))
      } else {
        throw new Error('Failed to fetch')
      }
    } catch (error) {
      toast({
        title: 'Could not delete doctor!',
        description: 'Please try again later',
        status: 'error',
        isClosable: true,
        duration: 3000
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
      <Table
        shadow='md'
        borderRadius='md'
        bg={tableColor}
        variant='simple'
      >
        <TableCaption>All patient details</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Gender</Th>
            <Th>Mobile</Th>
            <Th>Appointments</Th>
            <Th>Delete patient</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.length > 0
            ? patients.map(p => (
              <Tr>
                <Td>{p.name}</Td>
                <Td>{p.age}</Td>
                <Td>{p.gender[0].toUpperCase() + p.gender.substring(1)}</Td>
                <Td>{p.mobile}</Td>
                <Td>{p.appointments.length}</Td>
                <Td textAlign='center'>
                  <IconButton
                    onClick={() => deletePatient(p._id)}
                    variant='ghost'
                    color='red'
                    icon={<MdDeleteOutline />}
                  />
                </Td>
              </Tr>
              ))
            : <Tr><Td textAlign='center'>No patients on the database</Td></Tr>}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default AllPatients
