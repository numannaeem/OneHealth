import { CheckIcon, SmallCloseIcon, TimeIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/layout'
import {
  Spinner,
  useColorModeValue,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Textarea,
  useToast
} from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react'
import baseUrl from '../../baseUrl'

function DoctorCards ({ userData }) {
  const [appointments, setAppointments] = useState([])
  const [activePatientId, setActivePatientId] = useState() // ID of patient for whom report is being created
  const [loading, setLoading] = useState(true)
  const [reportData, setReportData] = useState({ title: '', description: '' })

  const toast = useToast()

  const pendingColor = useColorModeValue('main.600', 'main.500')
  const tableColor = useColorModeValue('white', 'gray.800')

  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const handleChange = e => {
    setReportData(p => {
      p[e.target.name] = e.target.value
      return p
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${baseUrl}/doctors/${userData._id}/appointments`
        )
        if (res.ok) {
          const jsonRes = await res.json()
          jsonRes.sort((a, b) => (a.datetime > b.datetime ? 1 : -1))
          setAppointments(jsonRes)
        }
      } catch (error) {
        alert(error)
      }
      setLoading(false)
    }

    fetchData()
  }, [userData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseUrl}/doctors/${userData._id}/reports`, {
        method: 'POST',
        body: JSON.stringify({
          ...reportData,
          patientId: activePatientId
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (res.ok) {
        toast({
          title: 'Report created!',
          description:
            'The patient will recieve this report on their dashboard',
          isClosable: true,
          duration: 4000,
          status: 'success'
        })
        onClose()
        setReportData({ title: '', description: '' })
        setActivePatientId(null)
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
  }

  if (loading) {
    return (
      <Flex grow='1' align='center' justify='center'>
        <Spinner color='main.500' size='lg' />
      </Flex>
    )
  }

  return (
    <>
      <Modal
        motionPreset='slideInBottom'
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={handleSubmit}
          >
            <ModalHeader>Create report</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={handleChange}
                  name='title'
                  ref={initialRef}
                  placeholder='Report title'
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  onChange={handleChange}
                  name='description'
                  placeholder='Report description'
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type='submit' colorScheme='yellow' mr={3}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Flex mt={5}>
        <Table
          maxWidth='95vw'
          overflowX='auto'
          shadow='md'
          borderRadius='md'
          bg={tableColor}
          variant='simple'
        >
          <TableCaption>
            Number of appointments: {appointments.length}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Date &amp; time</Th>
              <Th>Reason</Th>
              <Th>Status</Th>
              <Th>Create report</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.length > 0
              ? (
                  appointments.map(a => (
                    <Tr key={a._id}>
                      <Td>{a.patient.name}</Td>
                      <Td>{new Date(a.datetime).toLocaleString('en-US')}</Td>
                      <Td>{a.description}</Td>
                      <Td>
                        {a.status === 'P'
                          ? (
                            <Text color={pendingColor}>
                              <TimeIcon /> Pending
                            </Text>
                            )
                          : a.status === 'R'
                            ? (
                              <Text color='red'>
                                <SmallCloseIcon /> Rejected
                              </Text>
                              )
                            : (
                              <Text color='green'>
                                <CheckIcon /> Accepted
                              </Text>
                              )}
                      </Td>
                      <Td textAlign='center'>
                        <Button
                          onClick={() => {
                            onOpen()
                            setActivePatientId(a.patient._id)
                          }}
                          size='sm'
                        >
                          Create
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )
              : (
                <Td>You have no appointments</Td>
                )}
          </Tbody>
        </Table>
      </Flex>
    </>
  )
}

export default DoctorCards
