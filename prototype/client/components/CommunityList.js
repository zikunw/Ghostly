import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useState, useEffect } from "react";
import { Heading, Link } from "@chakra-ui/react";

const LIMIT = 10;

//TODO
const CommunityList = (props) => {

    const communities = props.communities


    return (
        <>
            <Heading>Current communities:</Heading>
            <ul>
                {communities?.map(community => <Link href={"/community/" + community}><p>{community}</p></Link>)}
            </ul>
        </>
    )
}



const CommunityCard = ({communityName}) => {

}

export default CommunityList