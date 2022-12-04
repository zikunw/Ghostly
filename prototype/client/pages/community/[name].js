import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import {
  Avatar,
  IconButton,
  Image,
  Textarea,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  Box,
  Flex,
  Card,
  Center,
  Heading,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  isCommunityExist,
  getCommunityUsers,
  getUser,
} from "../../lib/fetchCommunity";
import { PostCard } from "../../components/PostCard";
import { useEffect, useState, setState } from "react";
//TODO

const CommunityPage = (props) => {
  const router = useRouter();
  const { name } = router.query;
  const { isValid, users } = props;
  const [userIds, setUserIds] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // const userIds = [];
    const userIdsTemp = [];
    async function getCommunityUsers1() {
      let res = await getCommunityUsers(name);
      // console.log(res);
      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // setUserIds([...userIds, doc.id]);
        userIdsTemp.push(doc.id);
        console.log("user id", doc.id);
        // console.log("userIds", [...userIds, doc.id]);
      });
      console.log("this is userIdsTemp!!\n" + userIdsTemp);
      setUserIds(userIdsTemp);
      console.log("this is userIds!!\n" + userIds);
    }

    getCommunityUsers1();
  }, []);

  useEffect(() => {
    const userInfosTemp = [];
    async function getCommunityUserInfo() {
      let maxLength = 10;
      if (userIds.length < 10) {
        maxLength = userIds.length;
      }

      for (let i = 0; i < maxLength; i++) {
        // we'll just display the top 10 users
        let res = await getUser(userIds[i]);
        // console.log("res " + JSON.stringify(res.data()));
        userInfosTemp.push({
          userDisplayName: res.data()["displayName"],
          userPic: res.data()["photoURL"],
          username: res.data()["username"],
          // console.log("test " + res.username);
        });
      }
      console.log("userInfosTemp" + JSON.stringify(userInfosTemp));
      setUserInfos(userInfosTemp);
      // console.log("maxLength " + maxLength);
      // console.log("userIds after getInfo" + userIds);
    }

    getCommunityUserInfo();
  }, [userIds]);

  return (
    <Box>
      {console.log("user info " + JSON.stringify(userInfos))}
      {userInfos.map((obj) => {
        console.log("User " + obj.username);
      })}
      <Center>
        <Card bg="white" margin="2%" width="90%" padding="1%">
          <Center>
            <Heading size="3xl">{name}</Heading>
          </Center>
        </Card>
      </Center>

      <Center>
        <Grid
          templateAreas={`"posts users"`}
          gridTemplateRows={"1fr 1fr"}
          gridTemplateColumns={"minmax(200px, 1fr) 200px"}
          gap="1"
          width="80%"
        >
          {/* display the posts */}
          <GridItem area={"posts"}>
            <Box>
              <PostCard
                userDisplayName="Sharon Zou"
                username="sharonzou"
                userPic="https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c"
                description="this is new jeans' new comeback video"
                thumbnail="https://i.ytimg.com/vi/js1CtxSY38I/mqdefault.jpg"
              />
            </Box>
          </GridItem>

          {/* Display community information */}
          <GridItem colStart={2} colEnd={5} area={"users"} marginRight="2%">
            <Card maxW="sm" bg="white">
              <CardHeader>
                <Heading size="sm">About Community</Heading>
                <Text fontSize="xs">Created November 29, 2022</Text>
              </CardHeader>

              <CardBody>
                <Heading size="sm">Users</Heading>
                {userInfos.map((obj) => {
                  return (
                    <User
                      userDisplayName={obj.userDisplayName}
                      username={obj.username}
                      userPic={obj.userPic}
                    />
                  );
                })}
              </CardBody>

              <CardFooter>
                <Button onClick={onOpen}>Create Post</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Create New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex direction="column" width="100%">
                        <Center>
                          <FormControl>
                            <Input
                              marginTop="1%"
                              type="text"
                              placeholder="Title"
                              maxLength="30"
                            ></Input>
                            <Textarea
                              marginTop="1%"
                              type="text"
                              placeholder="Description"
                            ></Textarea>
                            <FormHelperText>
                              Enter a Youtube or Spotify Link to share to this
                              community!
                            </FormHelperText>
                            <Select
                              marginTop="1%"
                              placeholder="Select link type"
                            >
                              <option>Spotify</option>
                              <option>Youtube</option>
                            </Select>
                            <Input
                              marginTop="1%"
                              type="url"
                              placeholder="Link"
                            ></Input>
                          </FormControl>
                        </Center>
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="gray" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme="blue">Post</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};

const User = (props) => {
  return (
    <Flex direction="row" marginTop="3%">
      <Avatar marginRight="5%" name={props.username} src={props.userPic} />
      <Center>
        <Text width="100%">{props.userDisplayName}</Text>
      </Center>
    </Flex>
  );
};

export async function getServerSideProps(context) {
  const { name } = context.query;

  const isValid = await isCommunityExist(name);
  const users = await getCommunityUsers(name);

  return {
    props: {
      isValid: isValid,
      users: JSON.stringify(users),
    }, // will be passed to the page component as props
  };
}

export default CommunityPage;
