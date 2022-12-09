# Readme

This is a prototype for testing API calls using the express.js backend.

How to run:
1. `npm start` in server folder. (on port 3080)
2. `npm start` in client folder. (on port 3000)
3. Go on `localhost:3000`.

Technical stack:
1. Frontend: Next.js
2. Backend: Express.js
3. APIs used: Google book + Youtube
4. We use Firebase for OAuth and Firestore for storing our data. 

How it works:
1. The backend expressjs server (port 3080) uses Google API key to gain access from google book and youtube API (such as search by keyword function). Then we setup the api routes (/api/getbook and /api/getvideo) for GET methods to request. Both API accept one parameter, namely 'title'.
2. The Next.js server (port 3000) sends user the webpage contains function call to those API routes to port 3080. Then we parse out the result in the form of JSON file and display it on the webpage.
