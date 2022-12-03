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
  Badge,
  Stack,
  Link
} from "@chakra-ui/react";

import { isCommunityExist, getCommunityUsers, addCommunityPosts, getCommunityPosts, getUserInfo } from '../../lib/fetchCommunity'

import { useState, useContext } from 'react';
import { UserContext } from '../../lib/context';

import LoginWarning from '../../components/LoginWarning';

import { getYoutubeById } from '../../lib/fetchCommunity';
//TODO

const CommunityPage = (props) => {
  const {userData} = useContext(UserContext)
  const {user, username} = userData

  const router = useRouter()
  const { name } = router.query
  const { isValid, users, postList } = props

  return (
      <Box>
        {/* it would be nice if we could ADD SPACE here but idk why it won't work  */}
        <Flex direction="column">
          <Center>
          <Heading size="2xl" as="u">{name}</Heading>
          </Center>
          {user !== null ? 
            <PostForm communityName={name}/> : <LoginWarning />}
          
          
        </Flex>

        {/* display the posts */}
        {/* <PostCard userDisplayName="Sharon Zou"
                  username="sharonzou"
                  userPic="https://lh3.googleusercontent.com/a/ALm5wu3WoyyIJ5pWxyM4L0w8MhJRw78v1r6ncZSjUFxI=s96-c"
                  description="this is new jeans' new comeback video"
                  thumbnail="https://i.ytimg.com/vi/js1CtxSY38I/mqdefault.jpg"
          /> */}
        <PostCardList postList={postList}/>


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

const PostForm = ({communityName}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postURL, setPostURL] = useState("");
  const [postType, setPostType] = useState("youtube");

  const isError = postTitle === '' || postDescription === '' || postURL === ''

  const [previewResult, setPreviewResult] = useState("");
  const [hasPreview, setHasPreview] = useState(false);

  const {userData} = useContext(UserContext)
  const {user, username} = userData

  // Sumbit post
  async function handlePostSubmission(e) {
    e.preventDefault();
    const videoRegex = postURL.match('[?&]v=([^&]+)');
    // If the url is not valid
    if (videoRegex === null) {
      alert("invalid url")
      return;
    }
    if (isError) {
      console.log("please fill in every field.");
      return;
    }
    const videoId = videoRegex[1]
    const results = await getYoutubeById(videoId);

    await addCommunityPosts(
      communityName, postTitle, postType, 
      postURL, postDescription, user.uid, username,
      user.displayName, user.photoURL, results.items[0].snippet.thumbnails.high.url);
    window.location.reload(false);
  }

  // Handle post type change
  const  handlePostTitleOnChange = (e) => setPostTitle(e.target.value);
  const  handlePostDescriptionOnChange = (e) => setPostDescription(e.target.value);
  const  handlePostURLOnChange = (e) => setPostURL(e.target.value);
  const  handlePostTypeOnChange = (e) => setPostType(e.target.value);

  // Handle preview post information
  const handlePreview = async (e) => {
    e.preventDefault();

    if (postType === 'youtube') {
      
      const videoRegex = postURL.match('[?&]v=([^&]+)');
      // If the url is not valid
      if (videoRegex === null) {
        return;
      }
      const videoId = videoRegex[1]
      const results = await getYoutubeById(videoId);
      console.log(JSON.stringify(results.items[0].snippet.thumbnails.high))
      if (results.items.length > 0) {
        //setHasPreview(true);
        //setVideoTitle(results.items[0].snippet.title)
        //setVideoURL("https://www.youtube.com/watch?v=" + results.items[0].id);
        //setVideoThumbnail(JSON.stringify(results.items[0].snippet.thumbnails.high));
        //setVideoDescription(results.items[0].snippet.description);
        setPreviewResult(
          <PostCard
            userDisplayName={username}
            username={user.displayName}
            userPic={user.photoURL}
            description={postDescription}
            thumbnail={results.items[0].snippet.thumbnails.high.url}
          />
        )
      } else {
        setHasPreview(false);
      }


    } else if (postType === 'spotify') {

    }
  }

  return (
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
                <Input marginTop="1%" type='text' placeholder="Title" maxLength="30" onChange={handlePostTitleOnChange}></Input>
                <Textarea marginTop="1%" type='text' placeholder="Description" onChange={handlePostDescriptionOnChange}></Textarea>

                <FormHelperText>Enter a Youtube or Spotify Link to share to this community!</FormHelperText>
                <Flex gap={1}>
                  <Select marginTop="1%" w='150px' onChange={handlePostTypeOnChange} value={postType}>
                    <option key='spotify' value='spotify'>Spotify</option>
                    <option key='youtube' value='youtube'>Youtube</option>
                  </Select>
                  <Input flex='1' marginTop="1%" type='url' placeholder="Link" onChange={handlePostURLOnChange}></Input>
                  <Button marginTop="1%" onClick={handlePreview}>Preview</Button>
                </Flex>
                
                {previewResult}

                <Button marginTop="1%" colorScheme='blue' onClick={handlePostSubmission} w="100%">Post</Button>
                {isError && <Badge colorScheme='gray'>Invalid form.</Badge>}
              </FormControl>
            </Card>
          </Center>
  )
}

const PostCardList = ({postList}) => {
  return (
    <Stack spacing={8} direction='row'>
      {postList.map((doc) => {
          const {content, displayName, title, type, url, user, userProfile, username, thumbnail} = doc;
          return(
            <Link  href={url} isExternal>
              <PostCard
                userDisplayName={displayName}
                username={username}
                userPic={userProfile}
                description={content}
                thumbnail={thumbnail}
              />
            </Link>
            
          )
      })}
    </Stack>
  )

}

const PostCard = ( props ) => {
  //console.log(props)
  return (
    <Center>
      <Card maxW='md' backgroundColor="white" margin="2%" width="100%">
        <CardHeader pb={2}>
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
        <CardBody pt={2}>
          <Text>
            {props.description}
          </Text> {/** description */}
          <Image
          objectFit='cover'
          src={props.thumbnail}
          alt='Chakra UI'
          width="480px"
          height="360px"
        />
        </CardBody>
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
  const postsInObject = await getCommunityPosts(name);
  const postList = []
  
  postsInObject.forEach(async (rawdoc) => {
    const doc = rawdoc.data();

    postList.push({
      content: doc.content,
      displayName: doc.displayName,
      title: doc.title,
      type: doc.type,
      url: doc.url,
      user: doc.user,
      userProfile: doc.userProfile,
      username: doc.username,
      thumbnail: doc.thumbnail
    });
    
  })

  console.log(postList)

  

  return {
      props: { 
        isValid: isValid,
        users: JSON.stringify(users),
        postList: postList,
    }, // will be passed to the page component as props
  };
}

export default CommunityPage