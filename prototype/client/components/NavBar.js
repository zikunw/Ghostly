import Link from 'next/link'
import { Stack, Button, Avatar, Flex, Spacer, ButtonGroup, Text, Center, Highlight, Image } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'

const NavBar = () => {
    const { userData } = useContext(UserContext)
    const { user, username } = userData

    const [isLogoHover, setIsLogoHover] = useState(false)

    return (
        <Flex bg="gray.50" direction='row' spacing={4} align='center' p={6} borderBottom='1px' zIndex={1}>
            <Link href={"/"}>
                <Image 
                        src={'/logo.png'} 
                        boxSize='50px'
                        onMouseOver={() => setIsLogoHover(true)}
                        onMouseOut={() => setIsLogoHover(false)}

                        style= {{
                            transform: isLogoHover ? 'rotate(360deg)': '',
                            transition: isLogoHover ? 'all 1s ease-in-out' : 'all 0.5s ease-in-out' ,
                        }}
                    />
            </Link>
            <Link href={"/"}>
                <Center mr={4}><Text fontSize='4xl' fontWeight='bold' fontFamily='Nanum Pen Script'>Ghostly</Text></Center>
            </Link>
            <ButtonGroup gap="2">
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
                            <Text fontSize='md'>
                                Hello, {username}.
                            </Text>
                        </Center>
                        <Center>
                            <Link href={`/user`}>
                                <Avatar name={username} src={user?.photoURL} />
                            </Link>
                        </Center>
                        <Center>
                            <Button colorScheme='gray' variant='solid' onClick={()=>{auth.signOut()}}>
                                Sign out
                            </Button>
                        </Center>
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