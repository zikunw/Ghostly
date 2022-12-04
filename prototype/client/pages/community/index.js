import { Heading, Input, Box, Center, Card, CardHeader, Stack, Button, CardBody, Image, GridItem, Grid, Text, Divider } from "@chakra-ui/react";
import CommunityList from "../../components/CommunityList";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { useState } from "react";
import { searchCommunity } from "../../lib/fetchCommunity";

const CommunityPage = (props) => {
  const [communities, setCommunities] = useState(props.communities);
  const [name, setName] = useState("")

  async function handleSearchCommunity(e) {
    e.preventDefault;
    const searchName = "name";
    const result = await searchCommunity(searchName);

    const newCommunities = []
    result.forEach((doc) => {
      newCommunities.push(doc.id);
    })

    setCommunities(newCommunities);
}


  return (
    <Center>
        <Grid
          templateColumns='repeat(2, 1fr)'
          gap={4}
          bg={"white"}
          border="1px black solid"
          p={5}
          m={5}
          borderRadius={10}
        >
            <GridItem>
              <Stack spacing='24px'>
                <Heading>Search Community</Heading>
                  <Center><Image src={'/find-friend.png'} boxSize='200px'/></Center>
                  <Input
                    id='community-name'
                    placeholder='Teamwork!'
                    mb={2}
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                  />
                  <Button loadingText='Checking name' colorScheme='white' variant='outline' type='submit' className="btn-green" onClick={handleSearchCommunity}>
                      Search
                  </Button>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack direction='row' h='100%' p={5}>
                <Divider orientation='vertical' />
                
                <CommunityList communities={communities}></CommunityList>

              </Stack>
            </GridItem>
        </Grid>
    </Center>
  );
};

export default CommunityPage;

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
