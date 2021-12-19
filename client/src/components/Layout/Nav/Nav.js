import React from 'react'
import {
  Flex,
  Container,
  Image,
  Stack,
  Link,
  Text,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuButton,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

import { FaCog, FaChevronDown, FaUserCircle } from 'react-icons/fa'

import './Nav.scss'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Nav () {
  // colors
  const bgColor = useColorModeValue('white', 'gray.800')

  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')
  const { toggleColorMode } = useColorMode()
  const ColorModeToggleButton = props => {
    if (colorMode === 'dark') {
      return <SunIcon {...props} onClick={toggleColorMode} />
    } else {
      return <MoonIcon {...props} onClick={toggleColorMode} />
    }
  }
  return (
    <Flex
      position={{ md: 'fixed' }}
      bg={bgColor}
      minH='4rem'
      w='100%'
      marginTop={{ md: '-4rem' }}
      zIndex='99'
    >
      <Container maxW='container.lg' paddingTop='5px'>
        <Stack
          direction={['column', 'row']}
          alignItems={['flex-end', 'center']}
        >
          <Flex align='center' mr={2}>
            <Image
              my='1'
              mr='3'
              boxSize='46px'
              src='OneHealth-logo.png'
            />
            <Text fontSize='xl' fontWeight='500'>
              OneHealth
            </Text>
          </Flex>
          <Stack direction={['column', 'row']}>
            <Button colorScheme='navItem' variant='ghost'>
              Appointments
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='navItem'
                variant='ghost'
                rightIcon={<Icon as={FaChevronDown} color='navItem.500' />}
              >
                Users
              </MenuButton>
              <MenuList>
                <MenuGroup title='Add/Edit Users'>
                  <MenuItem>Doctors</MenuItem>
                  <MenuItem>Patients</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
          <Stack align='center' direction={['column', 'row']} style={{ marginLeft: 'auto' }}>
            <ColorModeToggleButton mr='2' />
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='navItem'
                variant='ghost'
                rightIcon={<Icon as={FaUserCircle} size='lg' color='navItem.500' />}
              >
                Account
              </MenuButton>
              <MenuList>
                <MenuGroup title='Profile'>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Sign Out </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  )
}
