import '../styles/globals.css'

import { Box, ChakraProvider, extendTheme, Flex, Spacer } from '@chakra-ui/react'
import NavBar from '../components/NavBar'

import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{userData}}>
        <Flex
          direction="column"
          minH="100vh"
        >
          <NavBar />
          <Component {...pageProps} />
          <Spacer />
          <Footer />
        </Flex>
      </UserContext.Provider>
    </ChakraProvider>
    )
}

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        backgroundImage: "radial-gradient(#CCCCCC 20%, #E2E8F0 20%)",
        backgroundPosition: "0 0",
        backgroundSize: "10px 10px",
        height: "200px",
        width: "100%"
      },
    }),
  },
});

export default MyApp
