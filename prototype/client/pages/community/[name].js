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
  Text,
  Grid, 
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

import { isCommunityExist, getCommunityUsers } from '../../lib/fetchCommunity'
import {PostCard} from '../../components/PostCard'
//TODO

const CommunityPage = (props) => {
  const router = useRouter()
  const { name } = router.query
  const { isValid, users } = props

  return (
    <Box>
      <Center>
        <Card bg="white" margin="2%" width="90%" padding="1%">
          <Center>
          <Heading size="3xl">{name}</Heading>
          </Center>
        </Card>
      </Center>
    
    <Center>
        <Grid templateAreas={`"posts users"`}
              gridTemplateRows={'1fr 1fr'}
              gridTemplateColumns={'minmax(200px, 1fr) 200px'}
              gap='1'
              width="80%"
>
        {/* display the posts */}
        <GridItem area={"posts"}>
          <Box>
          <PostCard userDisplayName="Sharon Zou"
                    username="sharonzou"
                    userPic="https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c"
                    description="this is new jeans' new comeback video"
                    thumbnail="https://i.ytimg.com/vi/js1CtxSY38I/mqdefault.jpg"
          />
          </Box> 
        </GridItem>

        {/* Display community information */}
        <GridItem colStart={2} colEnd={4} area={"users"} marginRight="2%">
          <Card maxW='sm' bg="white">
          <CardHeader><Heading size='sm'>About Community</Heading></CardHeader>
        
        
        <Popover>
        <PopoverTrigger>
          <Button>Create Post</Button>
        </PopoverTrigger>
        <PopoverContent width="500px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Create New Post</PopoverHeader>
          <PopoverBody>
            <Flex direction="column" width="100%">
              
              <Center>
                <Card bg="white" 
                      width="100%"
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
          </PopoverBody>
        </PopoverContent>
      </Popover>
            <CardHeader size='md' as="b">Users</CardHeader>
            <CardBody>
              <User userDisplayName="Sharon Zou"
                    username="sharonzou"
                    userPic="https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c"/>
            </CardBody>
        </Card>
        </GridItem>
      </Grid>
      </Center>

    </Box>

    )
}

const User = (props) => {
  return (
    <Flex direction="row" >
      <Avatar marginRight="2%" name={props.username} src={props.userPic} />
      <Center>
      <Text width="100%">{props.userDisplayName}</Text>
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