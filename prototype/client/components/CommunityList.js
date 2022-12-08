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
import { addCommunityUser } from "../lib/fetchCommunity";
import Link from "next/link";

const LIMIT = 10;

//TODO
const CommunityList = (props) => {
  const communities = props.communities;

  return (
    <Box w="100%">
      <Flex direction="column" width="100%">
        {communities?.map((community) => (
          <CommunityCard communityName={community} />
        ))}
      </Flex>
    </Box>
  );
};

const CommunityCard = ({ communityName }) => {
  const { userData } = useContext(UserContext);
  const { user, username } = userData;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  async function handleJoinButton(e) {
    e.preventDefault();
    const res = await addCommunityUser(communityName, user.uid, username);
    onOpen();
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
        <Center>
          <Button height="100%" onClick={handleJoinButton}>
            Join
          </Button>
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
              Success! You are now a community member of:{" "}
              <Text as="span" color="teal">
                <Link href={"/community/" + communityName}>
                  {communityName}
                </Link>
              </Text>
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
