import "./styles.css";
import React from 'react';
import { useState } from "react";
import { getBook } from "./utils";

const App = () => {
    const [bookTitle, setBookTitle] = useState("")
    const [bookList, setBookList] = useState([])

    async function handleSubmit(e)  {
        e.preventDefault();
        const results = await getBook(bookTitle);
        setBookList(results.items);
        console.log(results); // there is a lot of good info
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
              <li key={book.id}>{book.volumeInfo.title}</li>
            )}
        </ol>
        
        </>
        
    )
}


export default App