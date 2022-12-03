import { Heading, Button, Input, Text } from "@chakra-ui/react"
import { result } from "lodash"
import { useState, useContext } from "react"
import { UserContext } from "../lib/context"
import { getYoutubeByName, getYoutubeById, addCommunityPosts, deleteCommunityPosts, getCommunityPosts } from "../lib/fetchCommunity"

export default function TestAPIPage() {

    const {userData} = useContext(UserContext)
    const {user, username} = userData

    const [title, setTitle] = useState("")
    const [responses, setResponses] = useState([])
    const [rawJson, setRawJson] = useState('{}')

    // Variables when using query video by id
    const [foundVideo, setFoundVideo] = useState(false)
    const [videoTitle, setVideoTitle] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [videoThumbnail, setVideoThumbnail] = useState(null)
    const [videoDescription, setVideoDescription] = useState("");

    async function handleSearchVideoByName(e)  {
        e.preventDefault();
        const results = await getYoutubeByName(title);
        setResponses(results.items);
        setRawJson(JSON.stringify(results, null, 2));
        console.log(results); 
    }

    //get video by url
    async function handleSearchVideoByUrl(e) {
        e.preventDefault();
        const videoId = title.match('[?&]v=([^&]+)')[1];
        const results = await getYoutubeById(videoId);
        //console.log(results);
        if (results.items.length > 0) {
            setFoundVideo(true);
            setVideoTitle(results.items[0].snippet.title)
            setVideoURL("https://www.youtube.com/watch?v=" + results.items[0].id);
            setVideoThumbnail(JSON.stringify(results.items[0].snippet.thumbnails.high));
            setVideoDescription(results.items[0].snippet.description)
        } else {
            setFoundVideo(false);
        }
    }

    // Sumbit post
    async function handlePostSubmission(e) {
        e.preventDefault();
        await addCommunityPosts(
            "coder", 
            "test post title", 
            "youtube", 
            "https://www.youtube.com/watch?v=v5WDJ6U_TmQ", 
            "What a great video guys!", 
            user.uid);
    }

    // Delete post
    async function handlePostDeletion(e) {
        e.preventDefault();
        const postId = "X82KxGCl3NBabARyyiNK";
        const userId = user.uid;
        await deleteCommunityPosts("coder", postId, userId)
    }

    // Get all none deleted post under a community
    async function handleGetCommunityPosts(e) {
        e.preventDefault();
        const communityName = "coder";
        const result = await getCommunityPosts(communityName);
        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
    }

    return(
        <>
            <Heading>Test</Heading>
            <Button onClick={handlePostSubmission}>Test submit post</Button>
            <Button onClick={handlePostDeletion}>Test delete post</Button>
            <Button onClick={handleGetCommunityPosts}>Get community post</Button>
            <form action="/getbook" method="GET">
                <Input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    bg="white"
                ></Input>
                    <Button onClick={handleSearchVideoByUrl}>Search</Button>        
            </form>
            <Text>{foundVideo}</Text>
            <Text>{videoTitle}</Text>
            <Text>{videoDescription}</Text>
            <Text>{videoThumbnail}</Text>
            <Text>{videoURL}</Text>
        </>
    )
}