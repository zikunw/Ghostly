import Link from 'next/link'
import { Stack, Button } from '@chakra-ui/react'

const NavBar = () => {
    const user = null;
    const username = null;

    return (
        <Stack direction='row' spacing={4} align='center' p={6} bgColor='grey.100'>
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