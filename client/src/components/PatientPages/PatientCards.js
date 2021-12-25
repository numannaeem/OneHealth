import { Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import React from 'react'
import { Card, PageContent } from '../Layout'

function PatientCards() {
	return (
		<PageContent
        title='Dashboard'
        subtitle='Logged in as patient'
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Card
            title='Total Doctors'
          >
            <Flex alignItems='center' justifyContent='space-between'>
              <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
                20
              </Text>
              {/* <Stack alignItems="center">
                <Icon as={FaChevronUp} color="gray.100" fontSize="2em" />
                <Badge colorScheme="green">+2.5%</Badge>
              </Stack> */}
            </Flex>
          </Card>
          <Card title='New Appointments'>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
                12
              </Text>
              {/* <Stack alignItems="center">
                <Icon as={FaChevronDown} color="gray.100" fontSize="2em" />
                <Badge colorScheme="red">-2.5%</Badge>
              </Stack> */}
            </Flex>
          </Card>
          <Card title='Total Patients'>
            <Text fontSize='4em' lineHeight='4rem' fontWeight='700'>
              12
            </Text>
          </Card>
          <Card
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

export default PatientCards
