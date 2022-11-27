import Link from 'next/link'
import { Stack, Button, Avatar, Flex, Spacer, ButtonGroup } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const NavBar = () => {
    const { userData } = useContext(UserContext)
    const { user, username } = userData

    return (
        <Flex direction='row' spacing={4} align='center' p={6} borderBottom='1px'>
            <Link href={"/"}>
                <Button colorScheme='teal' variant='solid'>
                        Homepage
                </Button>
            </Link>

            <Spacer />

            {username && (
                    <ButtonGroup gap='2'>
                        <Button colorScheme='teal' variant='solid'>
                            <button onClick={()=>{auth.signOut()}}>Sign out</button>
                        </Button>
                        
                        <Link href={`/${username}`}>
                            <Avatar name='User avatar' src={user?.photoURL} />
                        </Link>
                    
                    </ButtonGroup>
                )}

                {!username && (
                    
                    <Link href={"/login"}>
                        <Button colorScheme='teal' variant='solid'>Log in</Button>
                    </Link>
                    
                )}
            
        </Flex>
    )
}

export default NavBar;