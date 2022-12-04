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
    <Box>
      <Heading p="2rem" as="u">
        Current communities
      </Heading>
      <Flex gap={2} p="2rem">
        <Flex direction="column" width="100%">
          {communities?.map((community) => (
            <Flex width="100%" justifyContent="space-between" padding="2%">
              <CommunityCard communityName={community} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

const CommunityCard = ({ communityName }) => {
  return (
    <Card bg="white" direction="row" width="100%">
      <CardHeader>
        <Link href={"/community/" + communityName}>
          <Heading size="sm">{communityName}</Heading>
        </Link>
      </CardHeader>
      <Spacer />
      <Button height="100%" >Join</Button>
    </Card>
  );
};

export default CommunityList;
