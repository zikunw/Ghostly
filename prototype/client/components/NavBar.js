import Link from 'next/link'
import { Stack, Button, Avatar, Flex, Spacer, ButtonGroup, Text, Center } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const NavBar = () => {
    const { userData } = useContext(UserContext)
    const { user, username } = userData

    return (
        <Flex direction='row' spacing={4} align='center' p={6} borderBottom='1px'>
            <ButtonGroup gap="2">
                <Link href={"/"}>
                    <Button colorScheme='teal' variant='solid'>
                            Homepage
                    </Button>
                </Link>
                <Link href={"/community"}>
                    <Button colorScheme='teal' variant='solid'>
                            Join Community
                    </Button>
                </Link>
                <Link href={"/community/create"}>
                    <Button colorScheme='teal' variant='solid'>
                            Create Community
                    </Button>
                </Link>
            </ButtonGroup>
            <Spacer />

            {username && (
                    <ButtonGroup gap='2'>
                        <Center>
                            <Text fontSize='xl' fontWeight='bold'>
                                Hello, {username}.
                            </Text>
                        </Center>
                        <Center>
                            <Link href={`/user`}>
                                <Avatar name='User avatar' src={user?.photoURL} />
                            </Link>
                        </Center>
                        <Button colorScheme='teal' variant='solid'>
                            <button onClick={()=>{auth.signOut()}}>Sign out</button>
                        </Button>
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