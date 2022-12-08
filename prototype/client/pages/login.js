import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../lib/context";

import { useMediaQuery } from "@chakra-ui/react";

import { debounce } from "lodash";

import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

import {
  Input,
  Button,
  Image,
  Box,
  Center,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Grid,
  GridItem,
  Badge,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
//<Image src={"/login-background.png"}></Image>
export default function EnterPage({}) {
  const { userData } = useContext(UserContext);
  const { user, username } = userData;

  const [isLargerThan800] = useMediaQuery("(min-width: 1000px)");

  return (
    <main flex="1">
      <Center>
        <Card maxW="md" bg="gray.50" mt="10" p="10" mb={5} border="1px">
          <Image
            src={"/logo.png"}
            boxSize="100px"
            position="absolute"
            left="-70px"
            bottom="10px"
            zIndex={-1}
            className="hvr-skew-backward"
          />
          <CardHeader>
            <Center>
              <Heading size="lg">
                {!username ? "Login" : `Welcome, ${username}!`}
              </Heading>
            </Center>
          </CardHeader>
          <CardBody>
            {user ? (
              !username ? (
                <UsernameForm />
              ) : (
                <SignOutButton username={username} userPic={user?.photoURL} />
              )
            ) : (
              <SignInButton />
            )}
          </CardBody>
        </Card>
      </Center>
    </main>
  );
}

function GoogleLogo() {
  return <Image src={"/google.png"} boxSize="30px" />;
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <Button
      leftIcon={<GoogleLogo />}
      colorScheme="gray"
      variant="solid"
      className="btn-google"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </Button>
  );
}

function SignOutButton(props) {
  return (
    <Grid minH={200} gap={5}>
      <Center>
        <Avatar name={props.username} src={props.userPic} size="xl" />
      </Center>

      <Link as={NextLink} href="/">
        <Button colorScheme="white" variant="outline" w="100%">
          Explore communities
        </Button>
      </Link>
      <Button
        colorScheme="gray"
        variant="outline"
        onClick={() => auth.signOut()}
      >
        Sign out
      </Button>
    </Grid>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userData } = useContext(UserContext);
  const { user, username } = userData;

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(firestore, `users/${user.uid}`);
    const usernameDoc = doc(firestore, `usernames/${formValue}`);

    const batch = writeBatch(firestore);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(firestore, `usernames/${username}`);
        const docSnap = await getDoc(ref);
        console.log(`firestore read executed`);
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <form onSubmit={onSubmit}>
          <SimpleGrid spacing={2}>
            <Heading size="sm">Choose Username</Heading>
            <Input
              name="username"
              placeholder="username"
              value={formValue}
              onChange={onChange}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
            <Button
              colorScheme="teal"
              variant="solid"
              type="submit"
              className="btn-green"
              disabled={!isValid}
              w="100%"
            >
              Submit
            </Button>
          </SimpleGrid>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Badge>Checking...</Badge>;
  } else if (isValid) {
    return <Badge colorScheme="green">{username} is available!</Badge>;
  } else if (username && !isValid) {
    return (
      <Badge colorScheme="red">Username is either taken or invalid.</Badge>
    );
  } else {
    return <p></p>;
  }
}
