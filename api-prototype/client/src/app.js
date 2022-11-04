import "./styles.css";
import { useState, useEf } from "react";
import { getBook } from "./utils";

const App = () => {
    const [bookTitle, setBookTitle] = useState("")
    const [bookList, setBookList] = useState([])

    async function handleSubmit(e)  {
        e.preventDefault();
        console.log("Form clicked");
        const results = await getBook(bookTitle);
        setBookList(results.items);
    }
      

    return(
        <>
        <form action="/getbook" method="GET">
            <input
                value={bookTitle}
                onChange={e => setBookTitle(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>Submit</button>
            
        </form>

        <ol>
            {bookList.map((book) =>
              <li>{book.volumeInfo.title}</li>
            )}
        </ol>
        
        </>
        
    )
}


export default App