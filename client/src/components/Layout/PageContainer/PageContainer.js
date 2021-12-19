import React from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'

import './PageContainer.scss'

export default function PageContainer (props) {
  const bgColor = useColorModeValue('secondary.background', 'gray.700')

  return (
    <Flex
      bg={bgColor}
      minHeight='100vh'
      width='100%'
      alignItems='center'
      justifyContent='top'
      flexDirection='column'
      paddingTop={props.isFixedNav ? { md: '4rem' } : '0'}
    >
      {props.children}
    </Flex>
  )
}
