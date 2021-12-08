import { extendTheme } from '@chakra-ui/react'

// 3. extend the theme
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true
  // colors: {
  // 	brand : {
  // 		100: '#ff0000',
  // 		900: '#ff00ff',
  // 	}
  // }
})

export default theme
