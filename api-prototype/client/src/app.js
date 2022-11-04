import "./styles.css";
import { useState, useEf } from "react";
import { getBook } from "./utils";

const App = () => {
    const [bookTitle, setBookTitle] = useState("")
    const [content, setContent] = useState("No content yet")

    async function handleSubmit(e)  {
        e.preventDefault();
        console.log("Form clicked");
        const results = await getBook(bookTitle);
        console.log(results)
    }
      

    return(
        <form action="/getbook" method="GET">
            <input
                value={bookTitle}
                onChange={e => setBookTitle(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>Submit</button>
            <p>{content}</p>
        </form>
    )
}


export default App