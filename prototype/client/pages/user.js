import {
  Heading,
  Flex,
  Text,
  Box,
  Card,
  CardHeader,
  Link,
  Spacer,
  Button,
  Center,
  Avatar,
  IconButton,
  CardBody,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { UserContext } from "../lib/context";
import { useContext, useEffect } from "react";
import { firestore } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const User = () => {
  const { userData } = useContext(UserContext);
  const { user, username } = userData;

  //   Mock Data
  const subscribedCommunities = [
    {
      name: "coder",
    },
    {
      name: "fdfa",
    },
  ];

  return (
    <>
      {username && (
        <>
          <Heading>User Setting Page</Heading>
          <Heading fontSize="sm">Hello, {username}</Heading>

          <Flex direction="column" width="100%">
            <Text>Subscribed Communities</Text>
            <Flex direction="column">
              {subscribedCommunities?.map((community) => (
                // <Box>{community.name}</Box>
                <Box width="50%">
                  <CommunityCard communityName={community.name} />
                </Box>
              ))}
            </Flex>
          </Flex>

          <Heading>Your Posts</Heading>
          <SimpleGrid columns={[2, null, 3]} spacing="40px">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </SimpleGrid>
        </>
      )}
      {!username && <Heading>Please login</Heading>}
    </>
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
      <Box>
        <Button height="100%">Join</Button>
        <Button height="100%">Leave</Button>
      </Box>
    </Card>
  );
};

const PostCard = ({}) => {
  return (
    <Center>
      <Card maxW="md" backgroundColor="white" margin="2%" width="100%">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name="sharon"
                src="https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c"
              />

              <Box>
                <Heading size="sm">Sharon Zou</Heading> {/** display name */}
                <Text>sharon</Text> {/** username */}
              </Box>
            </Flex>
            <Box>
              <Link>Community: coder</Link>
            </Box>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>New Jeans song is out!</Text> {/** description */}
        </CardBody>
        <Image
          objectFit="cover"
          src="https://i.ytimg.com/vi/11cta61wi0g/mqdefault.jpg"
          alt="Chakra UI"
        />
      </Card>
    </Center>
  );
};

export default User;
