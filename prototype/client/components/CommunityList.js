import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState, useEffect, useContext, useRef } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Button,
  Box,
  Spacer,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { UserContext } from "../lib/context";
import {
  addCommunityUser,
  userInCommunity,
  deleteCommunityUser,
} from "../lib/fetchCommunity";
import Link from "next/link";

const LIMIT = 10;

//TODO
const CommunityList = (props) => {
  const communities = props.communities;
  const [loaded, setLoaded] = useState(false);
  const { userData } = useContext(UserContext);
  const { user, username } = userData;

  useEffect(() => {
    if (user != null) {
      setLoaded(true);
    }
  }, [user]);

  return (
    <Box w="100%">
      {loaded ? (
        <Flex direction="column" width="100%">
          {communities?.map((community) => (
            <CommunityCard
              communityName={community}
              user={user}
              username={username}
            />
          ))}
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
};

const CommunityCard = ({ communityName, user, username }) => {
  const [joined, setJoined] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function checkJoined() {
      const val = await userInCommunity(communityName, user.uid);
      if (val == true) {
        setJoined(val);
      }
      setLoaded(true);
    }

    checkJoined();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  async function handleJoinButton(e) {
    e.preventDefault();
    const res = await addCommunityUser(communityName, user.uid, username);
    setJoined(true);
    onOpen();
  }

  async function handleLeaveButton(e) {
    e.preventDefault();
    await deleteCommunityUser(communityName, user.uid);
    setJoined(false);
    onOpen();
    // window.location.reload(false);
  }

  return (
    <Center>
      <Card bg="white" direction="row" width="100%" m={2}>
        <CardHeader>
          <Link href={"/community/" + communityName}>
            <Heading size="sm">{communityName}</Heading>
          </Link>
        </CardHeader>
        <Spacer />
        {/* <Box width="100px" height="100%"> */}
        <Center>
          <Box width="100%" height="100%">
            {joined && loaded ? (
              <Button height="100%" minW="80px" onClick={handleLeaveButton}>
                Leave
              </Button>
            ) : (
              <></>
            )}
            {!joined && loaded ? (
              <Button height="100%" minW="80px" onClick={handleJoinButton}>
                Join
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Center>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent pt="2rem">
            <AlertDialogBody>
              {joined ? (
                <Box>
                  Success! You are now a community member of:{" "}
                  <Text as="span" color="teal">
                    <Link href={"/community/" + communityName}>
                      {communityName}
                    </Link>
                  </Text>
                </Box>
              ) : (
                <Box>
                  Sorry to see you go! You are now not a community member of:{" "}
                  <Text as="span" color="teal">
                    <Link href={"/community/" + communityName}>
                      {communityName}
                    </Link>
                  </Text>
                </Box>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};

export default CommunityList;
