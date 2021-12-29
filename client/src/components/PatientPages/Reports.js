import {
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

function Reports ({ userId }) {
  const toast = useToast()
  const tableColor = useColorModeValue('white', 'gray.800')
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/patients/${userId}/reports`)
        if (res.ok) {
          const jsonRes = await res.json()
          console.log(jsonRes)
          setReports(jsonRes)
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        toast({
          title: 'Could not fetch reports!',
          description: 'Please try again later',
          status: 'error',
          isClosable: true,
          duration: 3000
        })
      }
      setLoading(false)
    }
    fetchReports()
  }, [toast, userId])

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
        <TableCaption>All your reports</TableCaption>
        <Thead>
          <Tr>
            <Th>By doctor</Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports.length > 0
            ? reports.map(r => (
              <Tr>
                <Td verticalAlign='baseline'>{r.doctor}</Td>
                <Td verticalAlign='baseline' fontWeight='bold'>{r.title}</Td>
                <Td maxW='360px' overflowWrap='anywhere'>{r.description}</Td>
              </Tr>
              ))
            : <Tr><Td>No reports found</Td></Tr>}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default Reports
