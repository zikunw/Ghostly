import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Link,
  Button,
  Box,
  Spacer,
  Center,
} from "@chakra-ui/react";

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
          <Button height="100%">Join</Button>
        </Center>
      </Card>
    </Center>
  );
};

export default CommunityList;
