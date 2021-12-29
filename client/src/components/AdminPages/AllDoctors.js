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
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { MdDeleteOutline } from 'react-icons/md'

function AllDoctors () {
  const tableColor = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
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
      setLoading(false)
    }
    fetchDoctors()
  }, [toast])

  const deleteDoctor = async docId => {
    try {
      const res = await fetch(`${baseUrl}/doctors/${docId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (res.ok) {
        setDoctors(prev => prev.filter(d => d._id !== docId))
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
        <TableCaption>All doctor details</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Experience (years)</Th>
            <Th>Specialization</Th>
            <Th>Qualifications</Th>
            <Th>Availability</Th>
            <Th>Delete doctor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {doctors.length > 0
            ? doctors.map(d => (
              <Tr>
                <Td>{d.name}</Td>
                <Td>{d.experience}</Td>
                <Td>{d.specialization}</Td>
                <Td>{d.qualifications.join(', ')}</Td>
                <Td textAlign='center'>
                  {d.available
                    ? (
                      <CheckIcon color='green' />
                      )
                    : (
                      <CloseIcon color='red' />
                      )}
                </Td>
                <Td textAlign='center'>
                  <IconButton
                    onClick={() => deleteDoctor(d._id)}
                    variant='ghost'
                    color='red'
                    icon={<MdDeleteOutline />}
                  />
                </Td>
              </Tr>
              ))
            : <Tr><Td textAlign='center'>No doctors on the database</Td></Tr>}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default AllDoctors
