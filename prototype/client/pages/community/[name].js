import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../lib/firebase'
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
  Text
} from "@chakra-ui/react";

import { isCommunityExist, getCommunityUsers } from '../../lib/fetchCommunity'
//TODO

const CommunityPage = (props) => {
  const router = useRouter()
  const { name } = router.query
  const { isValid, users } = props

  return (
      <Box>
        {/* it would be nice if we could ADD SPACE here but idk why it won't work  */}
        <Flex direction="column">
          <Center>
          <Heading size="2xl" as="u">{name}</Heading>
          </Center>
          
          <Center>
            <Card bg="white" 
                  width="50%"
                  overflow='hidden'
                  variant='outline'
                  margin="2%"
                  padding="2%"
                  >

              <CardHeader>
                <Heading size='md'>Make a new post</Heading>
              </CardHeader>

              <FormControl>
                <Input marginTop="1%" type='text' placeholder="Title" maxLength="30"></Input>
                <Textarea marginTop="1%" type='text' placeholder="Description"></Textarea>
                <FormHelperText>Enter a Youtube or Spotify Link to share to this community!</FormHelperText>
                <Select marginTop="1%" placeholder='Select link type'>
                  <option>Spotify</option>
                  <option>Youtube</option>
                </Select>
                <Input marginTop="1%" type='url' placeholder="Link"></Input>

                <Button marginTop="1%" colorScheme='blue'>Post</Button>
              </FormControl>
            </Card>
          </Center>
        </Flex>

        {/* display the posts */}
        <PostCard userDisplayName="Sharon Zou"
                  username="sharonzou"
                  userPic="https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c"
                  description="this is new jeans' new comeback video"
                  thumbnail="https://i.ytimg.com/vi/js1CtxSY38I/mqdefault.jpg"
        />


        {/* Display users */}
        {/* <Card maxW='sm' bg="white">
          <Heading size='m' as="b">Users</Heading>
          <CardBody>
            <User/>
          </CardBody>
        </Card> */}
      </Box>
    )
}

const PostCard = ( props ) => {
  console.log(props)
  return (
    <Center>
      <Card maxW='md' backgroundColor="white" margin="2%" width="100%">
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={props.username} src={props.userPic} />

              <Box>
                <Heading size='sm'>{props.userDisplayName}</Heading> {/** display name */}
                <Text>{props.username}</Text> {/** username */}
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            {props.description}
          </Text> {/** description */}
        </CardBody>
        <Image
          objectFit='cover'
          src={props.thumbnail}
          alt='Chakra UI'
        />
      </Card>
    </Center>
  );
};

const User = ({}) => {
  return (
    <Flex direction="row">
      <Avatar name='sharon' src='https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c' />
      <Center>
      <Text marginLeft="1%" width="100%">Sharon Zou</Text>
      </Center>
    </Flex>
  )
}

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

export default CommunityPage