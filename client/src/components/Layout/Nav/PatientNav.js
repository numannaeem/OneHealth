import React from 'react'
import {
  Flex,
  Container,
  Image,
  Stack,
  Text,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuGroup,
  MenuList,
  MenuButton,
  useColorMode,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react'

import { FaChevronDown, FaUserCircle } from 'react-icons/fa'

import './Nav.scss'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function PatientNav ({ name }) {
  // colors
  const bgColor = useColorModeValue('white', 'gray.800')

  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')
  const { toggleColorMode } = useColorMode()
  const ColorModeToggleButton = props => {
    if (colorMode === 'dark') {
      return (
        <Tooltip label='Toggle theme'>
          <SunIcon cursor='pointer' {...props} onClick={toggleColorMode} />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip label='Toggle theme'>
          <MoonIcon cursor='pointer' {...props} onClick={toggleColorMode} />
        </Tooltip>
      )
    }
  }

  const signOut = () => {
    localStorage.removeItem('oneHealth')
    window.location.replace('/login')
  }

  const navigate = useNavigate()

  return (
    <Flex
      userSelect='none'
      position={{ md: 'fixed' }}
      bg={bgColor}
      minH='4rem'
      w='100%'
      marginTop={{ md: '-4rem' }}
      zIndex='99'
    >
      <Container maxW='container.lg' paddingTop='5px'>
        <Stack direction={['column', 'row']} alignItems='center'>
          <Flex
            cursor='pointer'
            align='center'
            mr={2}
            onClick={() => navigate('/')}
          >
            <Image my='1' mr='3' boxSize='46px' src='OneHealth-logo.png' />
            <Text fontSize='xl' fontWeight='500'>
              OneHealth
            </Text>
          </Flex>
          <Stack direction={['column', 'row']}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='navItem'
                variant='ghost'
                rightIcon={<Icon as={FaChevronDown} color='navItem.500' />}
              >
                Appointments
              </MenuButton>
              <MenuList>
                <MenuGroup title='Manage Appointments'>
                  <MenuItem
                    onClick={() => navigate('/dashboard/new-appointment')}
                  >
                    New Appointment
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/dashboard/appointments')}>
                    View Appointments
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Button
              onClick={() => navigate('/dashboard/reports')}
              colorScheme='navItem'
              variant='ghost'
            >
              View reports
            </Button>
          </Stack>
          <Stack
            ml={{ sm: 'auto !important' }}
            align='center'
            direction={['column', 'row']}
          >
            <ColorModeToggleButton mr='2' />
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='navItem'
                variant='ghost'
                rightIcon={
                  <Icon as={FaUserCircle} size='lg' color='navItem.500' />
                }
              >
                {name || 'Account'}
              </MenuButton>
              <MenuList>
                <MenuGroup title='Profile'>
                  {/* <MenuItem>My Account</MenuItem> */}
                  <MenuItem onClick={signOut}>Sign Out </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  )
}
