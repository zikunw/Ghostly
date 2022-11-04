const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
  
const app = express();
const PORT = 3080;

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, "/public", "index.html"));
//})

app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/getbook', (req, res) => {
    const title = req.query.title
    console.log("Book requested")
    console.log(title)
    res.json({title: title})
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

