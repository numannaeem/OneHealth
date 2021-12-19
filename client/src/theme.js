import { theme } from '@chakra-ui/react'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    main: {
      50: '#FFF9E5',
      100: '#FFEEB8',
      200: '#FFE38A',
      300: '#FFD85C',
      400: '#FFCE2E',
      500: '#FFC300',
      600: '#CC9C00',
      700: '#997500',
      800: '#664E00',
      900: '#332700'
    },
    secondary: {
      background: '#FBF7EF',
      link: '#4A5568',
      card: '#ffffff',
      inputHelper: '#CBD5E0'
    },
    navItem: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568'
    }
  }
}

export default customTheme
