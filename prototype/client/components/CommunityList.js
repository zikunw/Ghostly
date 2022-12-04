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
} from "@chakra-ui/react";

const LIMIT = 10;

//TODO
const CommunityList = (props) => {
  const communities = props.communities;

  return (
    <Box w="100%">
      <Flex direction="column" width="100%">
        {communities?.map((community) => (
          <CommunityCard key={community} communityName={community} />
        ))}
      </Flex>
    </Box>
  );
};

const CommunityCard = ({ communityName }) => {
  return (
    <Card bg="white" direction="row" width="100%" m={2}>
      <CardHeader>
        <Link href={"/community/" + communityName}>
          <Heading size="sm">{communityName}</Heading>
        </Link>
      </CardHeader>
      <Spacer />
      <Button height="100%">Join</Button>
    </Card>
  );
};

export default CommunityList;
