import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState, useEffect } from "react";
import { Card, CardHeader, Flex, Heading, Link } from "@chakra-ui/react";

const LIMIT = 10;

//TODO
const CommunityList = (props) => {

    const communities = props.communities


    return (
        <>
            <Heading>Current communities:</Heading>
            <Flex gap={2}>
                {communities?.map(community => (
                    <Link href={"/community/" + community}>
                        <CommunityCard communityName={community} />
                    </Link>
                    ))}
            </Flex>
        </>
    )
}



const CommunityCard = ({communityName}) => {
    return (
        <Card bg="white">
            <CardHeader>
                <Heading size="sm">{communityName}</Heading>
            </CardHeader>
        </Card>
    )
}

export default CommunityList