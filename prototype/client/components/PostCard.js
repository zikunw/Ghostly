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
} from "@chakra-ui/react";

import { useContext } from "react";
import { UserContext } from "../lib/context";

export const PostCard = (props) => {
  const {userData} = useContext(UserContext)
  const {user, username} = userData

  return (
    <Center>
      <Card maxW="md" backgroundColor="white" width="100%">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={props.username} src={props.userPic} />

              <Box>
                <Heading size="sm">{props.userDisplayName}</Heading>{" "}
                {/** display name */}
                <Text>{props.username}</Text> {/** username */}
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{props.description}</Text> {/** description */}
        </CardBody>
        <Image objectFit="cover" src={props.thumbnail} alt="Chakra UI" />
      </Card>
    </Center>
  );
};
