import { Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../baseUrl'
import { Card, PageContent } from '../Layout'

function AdminCards ({ docCount, patientCount, appCount }) {

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${baseUrl}/`)
      } catch (error) {
        
      }
    }
  }, [])

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
              {docCount}
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
              {appCount}
            </Text>
            {/* <Stack alignItems="center">
                <Icon as={FaChevronDown} color="gray.100" fontSize="2em" />
                <Badge colorScheme="red">-2.5%</Badge>
              </Stack> */}
          </Flex>
        </Card>
        <Card title='Total Patients'>
          <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
            {patientCount}
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
