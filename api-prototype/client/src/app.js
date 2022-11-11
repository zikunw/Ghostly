import "./styles.css";
import { useState } from "react";
import { getBook, getVideo } from "./utils";
import JsonFormatter from 'react-json-formatter'

const App = () => {
    const [title, setTitle] = useState("")
    const [responses, setResponses] = useState([])
    const [rawJson, setRawJson] = useState('{}')

    async function handleSearchBook(e)  {
        e.preventDefault();
        const results = await getBook(title);
        setResponses(results.items);
        setRawJson(JSON.stringify(results, null, 2));
        console.log(results); 
    }

    async function handleSearchVideo(e)  {
        e.preventDefault();
        const results = await getVideo(title);
        setResponses(results.items);
        setRawJson(JSON.stringify(results, null, 2));
        console.log(results); 
    }
      

    return (
        <>
        <h1>API call test from client</h1>
        <form action="/getbook" method="GET">
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            ></input>
            <button onClick={handleSearchBook}>Search Book (Google Book)</button>
            <button onClick={handleSearchVideo}>Search Video (Youtube)</button>
            
        </form>

        {/* 
        <ol>
            {responses.map((book) =>
              <li key={book.id}>{book.volumeInfo.title}</li>
            )}
        </ol>
        */}
        

        <p>JSON result:</p>
        <pre>{rawJson}</pre>
        
        </>
        
    )
}


export default App