import '../styles/globals.css'

import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import NavBar from '../components/NavBar'

import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{userData}}>
        <NavBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
    )
}

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#E2E8F0",
      },
    }),
  },
});

export default MyApp
