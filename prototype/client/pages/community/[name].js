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
                <Select marginTop="1%" Placeholder='Select link type'>
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
        <PostCard></PostCard>


        {/* Display users */}
        <Card maxW='sm'>
          <CardBody>
            {/* <User/> */}
          </CardBody>
        </Card>
      </Box>
    )
}

const PostCard = ({ }) => {
  return (
    <Center>
      <Card maxW='md' backgroundColor="white" margin="2%" width="100%">
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='sharon' src='https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c' />

              <Box>
                <Heading size='sm'>Sharon Zou</Heading> {/** display name */}
                <Text>sharon</Text> {/** username */}
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
            New Jeans song is out!
          </Text> {/** description */}
        </CardBody>
        <Image
          objectFit='cover'
          src='https://i.ytimg.com/vi/11cta61wi0g/mqdefault.jpg'
          alt='Chakra UI'
        />

        {/* <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        > */}
          {/* <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
            Like
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
            Share
          </Button> */}
        {/* </CardFooter> */}
      </Card>
    </Center>
  );
};

const User = ({}) => {
  return (
    <Flex direction="row">
      <Avatar name='sharon' src='https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c' />
      <Text>Sharon Zou</Text>
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