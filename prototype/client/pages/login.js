import { auth, firestore, googleAuthProvider } from "../lib/firebase"
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth"

import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../lib/context'

import { debounce } from "lodash"

import Link from "next/link";

import { Input, Button, Image, Box, Center, Card, CardHeader, Heading, CardBody, Grid, GridItem } from "@chakra-ui/react";

export default function EnterPage({}) {
    const {userData} = useContext(UserContext)
    const {user, username} = userData

    return (
        <main>
            <Center>
                <Card maxW='md' bg="gray.50" mt="10" p="10">
                    <CardHeader>
                      <Heading size='md'>Login</Heading>
                    </CardHeader>
                    <CardBody>
                        {user ? 
                           !username ? <UsernameForm /> : <SignOutButton username={username}/> 
                           : 
                           <SignInButton />
                        }
                    </CardBody>
                </Card>
            </Center>
            
        </main>
    )
}

function GoogleLogo() {
    return(
        <Image src={'/google.png'} boxSize='30px' />
    )
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider)
    }

    return (
        <Button leftIcon={<GoogleLogo />} colorScheme='gray' variant='solid' className="btn-google" onClick={signInWithGoogle}>
            Sign in with Google
        </Button>
    )
}

function SignOutButton(props) {
    return (
        <Grid
            h="200px"
        >
            <Heading>Welcome {props.username}!</Heading>
            <Button colorScheme='gray' variant='outline' onClick={() => auth.signOut()}>Sign out</Button>
            <Link href="/" width="100%">
                <Button colorScheme='gray' variant='outline'>Explore communities</Button>
            </Link>
        </Grid>
    )
}

function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { userData } = useContext(UserContext)
    const { user, username } = userData

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue])

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

        if (val.length < 3) {
            setFormValue(val)
            setLoading(false)
            setIsValid(false)
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    
        // Create refs for both documents
        const userDoc = doc(firestore, `users/${user.uid}`);
        const usernameDoc = doc(firestore, `usernames/${formValue}`);

        const batch = writeBatch(firestore);
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL, 
            displayName: user.displayName 
        });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();
      };

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = doc(firestore, `usernames/${username}`)
                const docSnap = await getDoc(ref);
                console.log(`firestore read executed`)
                setIsValid(!docSnap.exists())
                setLoading(false)
            }
        }, 500),[]
    )

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <Input name="username" placeholder="username" value={formValue} onChange={onChange}/>
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    <Button colorScheme='teal' variant='solid' type='submit' className="btn-green" disabled={!isValid}>
                        Submit
                    </Button>
                </form>
            </section>
        )
    )

}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
}