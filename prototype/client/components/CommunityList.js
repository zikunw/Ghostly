import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../lib/context";
import {
  addCommunityUser,
  userInCommunity,
  deleteCommunityUser,
} from "../lib/fetchCommunity";

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
            <CommunityCard communityName={community} user={user} />
          ))}
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
};

const CommunityCard = ({ communityName, user }) => {
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

  async function handleJoinButton(e) {
    e.preventDefault();
    await addCommunityUser(communityName, user.uid, username);

    window.location.reload(false);
  }

  async function handleLeaveButton(e) {
    e.preventDefault();
    await deleteCommunityUser(communityName, user.uid);

    window.location.reload(false);
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
    </Center>
  );
};

export default CommunityList;
