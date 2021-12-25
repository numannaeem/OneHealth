import React from 'react'
import {
  Box,
  Stack,
  Button,
  Select,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'

import './Card.scss'

export default function Card ({
  title = '',
  subtitle = '',
  primaryAction = null,
  secondaryActions = null,
  filterActions = null,
  bg,
  color,
  children,
  _hover,
  onClick
}) {
  const adaptiveCardBg = useColorModeValue('white', 'gray.800')
  const adaptiveCardText = useColorModeValue('gray.800', 'white')
  const actions = []

  if (primaryAction) {
    actions.push(
      <Button
        key='0'
        onClick={primaryAction.onClick}
        colorScheme='main'
        size='sm'
      >
        {primaryAction.content}
      </Button>
    )
  }
  if (secondaryActions) {
    actions.push(
      secondaryActions.map((action, i) => (
        <Button
          key={i}
          onClick={action.onClick}
          colorScheme='main'
          variant='outline'
          size='sm'
        >
          {action.content}
        </Button>
      ))
    )
  }

  if (filterActions) {
    actions.push(
      filterActions.map((action, i) => (
        <Select variant='outline' key={i} onChange={action.onClick} size='sm'>
          {Object.keys(action.items).map((value, index) => (
            <option
              key={index}
              selected={action.default === value}
              value={value}
            >
              {action.items[value]}
            </option>
          ))}
        </Select>
      ))
    )
  }

  const header =
    title || subtitle || actions.length > 0
      ? (
        <Stack direction='row' alignItems='top' marginBottom='1.5rem'>
          <Stack>
            <Heading size='md'>{title}</Heading>
            <Heading fontWeight='semibold' size='xs' color='gray.600'>
              {subtitle}
            </Heading>
          </Stack>
          <Stack direction={['column', 'row']} style={{ marginLeft: 'auto' }}>
            {actions}
          </Stack>
        </Stack>
        )
      : (
          ''
        )
  return (
    <Box
      onClick={onClick}
      _hover={_hover}
      transition='all 100ms'
      width='100%'
      bg={bg || adaptiveCardBg}
      color={color || adaptiveCardText}
      boxShadow='md'
      rounded='lg'
      p={5}
    >
      {header}
      <Box>{children}</Box>
    </Box>
  )
}
