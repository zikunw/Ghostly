import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState, useEffect } from "react";

import { Heading, Box, Center, Card, Text, Flex } from "@chakra-ui/react";
import CommunityList from "../components/CommunityList";

export default function Home(props) {
  return (
    <Box>
      <Center>
        <Card bg="transparent" margin="2%" width="90%" padding="1%">
          <Center>
            <Flex flexDirection="column">
              <Heading size="xl">Welcome to Ghostly!</Heading>
              <Center>
                <Heading size="sm">
                  Click below to join one of our communities
                </Heading>
              </Center>
            </Flex>
          </Center>
        </Card>
      </Center>

      <CommunityList communities={props.communities}></CommunityList>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const communities = [];

  const docRef = collection(firestore, "communities");
  const querySnapshot = await getDocs(docRef);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    communities.push(doc.id);
  });

  return {
    props: {
      communities: communities,
    }, // will be passed to the page component as props
  };
}
