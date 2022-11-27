import Link from 'next/link'
import { Stack, Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'

const NavBar = () => {
    const { userData } = useContext(UserContext)
    const { user, username } = userData

    return (
        <Stack direction='row' spacing={4} align='center' p={6} borderBottom='1px'>
            <Link href={"/"}>
                <Button colorScheme='teal' variant='solid'>
                        Homepage
                </Button>
            </Link>

            {username && (
                    <>
                        <Button colorScheme='teal' variant='solid'>
                            <button onClick={()=>{auth.signOut()}}>Sign out</button>
                        </Button>
                        <Button colorScheme='teal' variant='solid'>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} />
                            </Link>
                        </Button>
                    </>
                )}

                {!username && (
                    
                    <Link href={"/login"}>
                        <Button colorScheme='teal' variant='solid'>Log in</Button>
                    </Link>
                    
                )}
            
        </Stack>
    )
}

export default NavBar;