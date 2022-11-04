const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
  
const app = express();
const PORT = 3080;

//import searchBook from 'api_calls.js'

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, "/public", "index.html"));
//})

app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/getbook', async (req, res) => {
    const title = req.query.title
    console.log("Book requested")
    console.log(title)
    //fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle`)
    //    .then(response => console.log(response))
    //    .catch((error) => { console.error('There has been a problem with your fetch operation:', error);})
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle`);
    const myJson = await response.json();
    //console.log(myJson)
    
    res.json(myJson)
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

