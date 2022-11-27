import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import NavBar from '../components/NavBar'

import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData()

  return (
    <ChakraProvider>
      <UserContext.Provider value={{userData}}>
        <NavBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
    )
}

export default MyApp
