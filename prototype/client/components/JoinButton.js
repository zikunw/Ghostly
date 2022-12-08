import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { getCommunityUsers } from "../lib/fetchCommunity";

export const JoinButton = (props) => {
  //   useEffect(async () => {
  //     const res = await getCommunityUsers(props.communityName);
  //     console.log(res);
  //   }, []);
  return <Button height="100%">Join</Button>;
};
