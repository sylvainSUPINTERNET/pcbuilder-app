import { extendTheme } from '@chakra-ui/react'


import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/space-mono/400.css'

const theme = extendTheme({
  fonts: {
    heading: `'Space Mono', sans-serif`,
    body: `'Space Mono', sans-serif`,
  },
})

export default theme