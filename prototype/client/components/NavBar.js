import Link from 'next/link'
import { Stack, Button, Avatar, Flex, Spacer, ButtonGroup, Text, Center, Highlight, Image } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const NavBar = () => {
    const { userData } = useContext(UserContext)
    const { user, username } = userData

    return (
        <Flex bg="gray.50" direction='row' spacing={4} align='center' p={6} borderBottom='1px' zIndex={1}>
            <ButtonGroup gap="2">
                <Image src={'/logo.png'} boxSize='50px' />
                <Link href={"/"}>
                    <Button colorScheme='gray' variant='outline'>
                            Homepage
                    </Button>
                </Link>
                <Link href={"/community"}>
                    <Button colorScheme='gray' variant='outline'>
                            Join Community
                    </Button>
                </Link>
                <Link href={"/community/create"}>
                    <Button colorScheme='gray' variant='outline'>
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
                                <Avatar name={username} src={user?.photoURL} />
                            </Link>
                        </Center>
                        <Button colorScheme='gray' variant='solid' onClick={()=>{auth.signOut()}}>
                            Sign out
                        </Button>
                    </ButtonGroup>
                )}

                {!username && (
                    
                    <Link href={"/login"}>
                        <Button colorScheme='gray' variant='solid'>Log in</Button>
                    </Link>
                    
                )}
            
        </Flex>
    )
}

export default NavBar;