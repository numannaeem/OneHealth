import { Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../baseUrl'
import { Card, PageContent } from '../Layout'

function AdminCards () {
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/countDocs`)
        if (res.ok) {
          const jsonRes = await res.json()
          setCount(jsonRes)
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
      setLoading(false)
    }
    fetchCount()
  }, [toast])

  const navigate = useNavigate()
  return (
    <PageContent
      title='Dashboard'
      subtitle='Logged in as admin'
    >
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
        <Card
          title='Total Doctors'
        >
          <Flex alignItems='center' justifyContent='space-between'>
            <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
              {loading ? <Spinner /> : count?.doctors}
            </Text>
            {/* <Stack alignItems="center">
                <Icon as={FaChevronUp} color="gray.100" fontSize="2em" />
                <Badge colorScheme="green">+2.5%</Badge>
              </Stack> */}
          </Flex>
        </Card>
        <Card title='Pending Appointments'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
              {loading ? <Spinner /> : count?.appointments}
            </Text>
            {/* <Stack alignItems="center">
                <Icon as={FaChevronDown} color="gray.100" fontSize="2em" />
                <Badge colorScheme="red">-2.5%</Badge>
              </Stack> */}
          </Flex>
        </Card>
        <Card title='Total Patients'>
          <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
            {loading ? <Spinner /> : count?.patients}
          </Text>
        </Card>
        <Card
          onClick={() => navigate('/dashboard/view-appointments')}
          bg='main.500'
          color='gray.800'
          _hover={{ backgroundColor: 'main.300', cursor: 'pointer' }}
          title='Manage Appointments >>'
          subtitle='Accept/reject pending appointments'
        />
      </SimpleGrid>
    </PageContent>
  )
}

export default AdminCards
