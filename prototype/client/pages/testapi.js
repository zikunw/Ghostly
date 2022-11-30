import { Heading, Button, Input, Text } from "@chakra-ui/react"
import { useState } from "react"
import { getYoutubeByName } from "../lib/fetchCommunity"

export default function TestAPIPage() {

    const [title, setTitle] = useState("")
    const [responses, setResponses] = useState([])
    const [rawJson, setRawJson] = useState('{}')

    async function handleSearchVideo(e)  {
        e.preventDefault();
        const results = await getYoutubeByName(title);
        setResponses(results.items);
        setRawJson(JSON.stringify(results, null, 2));
        console.log(results); 
    }

    return(
        <>
            <Heading>Test</Heading>
            <form action="/getbook" method="GET">
                <Input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    bg="white"
                ></Input>
                    <Button onClick={handleSearchVideo}>Search Video (Youtube)</Button>        
            </form>

            <Text>{rawJson}</Text>
        </>
    )
}