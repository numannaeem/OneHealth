import React from 'react'
import { Container, Stack, Heading, Button } from '@chakra-ui/react'

import './PageContent.scss'

export default function PageContent ({
  title = '',
  primaryAction = null,
  secondaryActions = null,
  centerContent = false,
  children,
  subtitle
}) {
  const actions = [
    primaryAction
      ? (
        <Button
          key='0'
          onClick={primaryAction.onClick}
          colorScheme='main'
          size='sm'
        >
          {primaryAction.content}
        </Button>
        )
      : (
          ''
        ),
    secondaryActions
      ? secondaryActions.map((action, i) => (
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
      : ''
  ]

  const header =
    title || actions
      ? (
        <Stack direction='row' alignItems='top' marginBottom={subtitle ? 2 : 5}>
          <Heading size='lg'>{title}</Heading>
          <Stack direction={['column', 'row']} style={{ marginLeft: 'auto' }}>
            {actions}
          </Stack>
        </Stack>
        )
      : (
          ''
        )

  const subheader = subtitle
    ? <Heading fontWeight='semibold' size='sm' color='gray.500' mb={5}>{subtitle}</Heading>
    : ''

  return (
    <Container
      maxW='container.lg'
      centerContent={centerContent}
      paddingTop='1.5rem'
    >
      {header}
      {subheader}
      {children}
    </Container>
  )
}
