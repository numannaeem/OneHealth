import { Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageContent } from '../Layout'

function PatientCards({userData}) {

  const navigate = useNavigate()

	return (
		<PageContent
        title='Dashboard'
        subtitle={`Logged in as ${userData.name}`}
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Card
            title='Total Appointments'
          >
            <Flex alignItems='center' justifyContent='space-between'>
              <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
                {userData.appointments.length || 0}
              </Text>
              {/* <Stack alignItems="center">
                <Icon as={FaChevronUp} color="gray.100" fontSize="2em" />
                <Badge colorScheme="green">+2.5%</Badge>
              </Stack> */}
            </Flex>
          </Card>
          <Card
            bg='main.500'
            color='gray.800'
            _hover={{ backgroundColor: 'main.300', cursor: 'pointer' }}
            title='View Appointments >>'
            subtitle='View the status of your appointments'
            onClick = {() => navigate('/dashboard/appointments')}
          />
          {/* <Card
            bg='main.500'
            color='gray.800'
            _hover={{ backgroundColor: 'main.300', cursor: 'pointer' }}
            title='View Doctors >>'
            subtitle='View all doctor details'
          /> */}
        </SimpleGrid>
      </PageContent>
	)
}

export default PatientCards
