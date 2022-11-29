import { useContext, useState, useCallback, useEffect } from "react"
import { debounce } from "lodash"
import { UserContext } from "../../lib/context"
import { auth, firestore, googleAuthProvider } from "../../lib/firebase"
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

import { useRouter } from 'next/router'
import LoginWarning from "../../components/LoginWarning";

const { Heading, Stack, Box, FormLabel, Input, Center, Badge, Button, Spacer, Card, CardHeader, CardBody, Image } = require("@chakra-ui/react")

const CreateCommunityPage = () => {
    const router = useRouter()

    const [communityName, setCommunityName] = useState("")
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {userData} = useContext(UserContext)
    const {user, username} = userData

    useEffect(() => {
        checkCommunityName(communityName);
    }, [communityName])

    const checkCommunityName = useCallback(
        debounce(async (name) => {
            if (name.length >= 3) {
                const ref = doc(firestore, `communities/${name}`)
                const docSnap = await getDoc(ref);
                console.log(`firestore read executed`)
                setIsValid(!docSnap.exists())
                setLoading(false)
            }
        }, 500),[]
    )

    const handleOnChange = (e) => {
        const val = e.target.value
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        if (val.length < 3) {
            setCommunityName(val)
            setLoading(false)
            setIsValid(false)
        }
        if (re.test(val)) {
            setCommunityName(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    
        // Create refs for new community
        const communityDoc = doc(firestore, `communities/${communityName}`);
        // Adding user to the community
        const userDoc = doc(firestore, `communities/${communityName}/users/${user.uid}`);

        const batch = writeBatch(firestore);
        batch.set(communityDoc, {
            creationDate: Timestamp.now()
        });
        batch.set(userDoc, {username: username})

        await batch.commit();
        router.push(communityName);
      };

    return (
        <>
            {username && (
                <form onSubmit={onSubmit}>
                <Center>
                    <Card bg="gray.50" mt={5} border="1px">
                        <CardHeader>
                            <Heading>Create Community</Heading>
                        </CardHeader>
                        <CardBody>
                        <Stack spacing='24px'>
                            <Center><Image src={'/find-friend.png'} boxSize='200px'/></Center>
                            <Box>
                                <FormLabel htmlFor='community-name'>New community name</FormLabel>
                                <Input
                                  onChange={handleOnChange}
                                  id='community-name'
                                  placeholder='Please enter the name for the new community.'
                                />
                                {isValid && (<Badge colorScheme='green'>This is a valid name!</Badge>)}
                                {!isValid && (<Badge colorScheme='red'>Invalid name. Try harder.</Badge>)}

                            </Box>
                            <Button colorScheme='white' variant='outline' type='submit' className="btn-green" disabled={!isValid} >
                                Submit
                            </Button>
                        </Stack>
                        </CardBody>
                    </Card>
                </Center>
                </form>
            )}
            {!username && (<LoginWarning />)}
        </>
    )
}

export default CreateCommunityPage