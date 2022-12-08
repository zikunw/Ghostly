import { Heading, Text } from "@chakra-ui/react";
import { UserContext } from "../lib/context";
import { useContext } from "react";

const User = () => {
  const { userData } = useContext(UserContext);
  const { user, username } = userData;

  return (
    <>
      {username && (
        <>
          <Heading>User Setting Page</Heading>
          <Text>Hi, {username}</Text>
        </>
      )}
      {!username && <Heading>Please login</Heading>}
    </>
  );
};

export default User;
