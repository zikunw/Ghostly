const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
  
const app = express();
const PORT = 3080;

google_api_key = process.env.GOOGLE_API_KEY;
spotify_oauth_token = process.env.SPOTIFY_OATH_TOKEN;

app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//index.js
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  })

app.get('/api/getbook', async (req, res) => {
    const title = req.query.title
    console.log(`Book requested: ${title}`)
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle`);
    const myJson = await response.json();

    res.json(myJson)
})

app.get('/api/getvideo', async (req, res) => {
    const title = req.query.title
    console.log(`Video requested: ${title}`)
    
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${title}&key=${google_api_key}`);
    const myJson = await response.json();

    res.json(myJson)
})

app.get('/api/getvideobyid', async (req, res) => {
    const title = req.query.title
    console.log(`Video requested: ${title}`)
    
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${title}&key=${google_api_key}`);
    const myJson = await response.json();

    res.json(myJson)
})

app.get('/api/getsongbyid', async (req, res) => {
    const songId = req.query.songId;
    console.log(`Song requested: ${songId}`);
    
    const response = await fetch(
            `https://api.spotify.com/v1/tracks/${songId}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${spotify_oauth_token}`
                }
            }
        );
    const myJson = await response.json();

    res.json(myJson)
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

