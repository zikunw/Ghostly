import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../lib/firebase'
import { Textarea, Button, CardHeader, Select, Box, Flex, Card, Center, Heading, Divider, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

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
      </Box>
    )
}

const PostCard = ({ props }) => {
  return (
    <Card bg="white" direction="row" width="100%">
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