import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../lib/firebase'
import { Button, CardHeader, Select, Box, Flex, Card, Center, Heading, Divider, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

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
                <Flex alignItems={"left"}>
                  <Heading size='md'>Make a new post</Heading>
                </Flex>
              </CardHeader>

              <FormControl>
                <FormLabel>Link Type</FormLabel>
                <Select Placeholder='Select link type'>
                  <option>Spotify</option>
                  <option>Youtube</option>
                </Select>

                <FormLabel marginTop="1%">Link</FormLabel>
                <Input type='url'></Input>
                <FormHelperText>Enter a Youtube or Spotify Link to share to this community!</FormHelperText>

                <Button marginTop="1%" colorScheme='blue'>Submit</Button>
              </FormControl>
            </Card>
          </Center>
        </Flex>
      </Box>
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