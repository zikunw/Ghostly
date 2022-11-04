//import axios from 'axios'

export async function searchBook(title) {
    //const url = `https://www.googleapis.com/books/v1/volumes?q=${title}+intitle`
    //const res = await axios.get(url)
    //return res.json()
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle`);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson)
    
}