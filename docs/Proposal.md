# CS411 Team 3 Project Proposal 

Our tech stack is 
- Front-End: React
- Back-End: Node.js 
- Database: Firebase (Google)


## Idea 1: Textbook Exchange

A web application where students find used textbooks from other students. Currently many students do this through social media, there isn't a centralized place to do this. Through this application students will create a profile and add what books they need or what books they want to sell. That will be stored in our database, and we will also use a google api (https://developers.google.com/books/docs/viewer/developers_guide) that will find the books the student wants and compare the online prices with the student prices. 

## Idea 2: Youtube Blend

A new tool that has become really popular recently is the Blend tool on Spotify – it lets Spotify users invite their friends to a Blend, which will create a playlist that essentially blends their favorite songs into one and then provide a similarity percentage of their music taste. But how would this similarity transfer across other media? This web application will attempt to create a Blend of Youtube videos and show us whether similar music taste means similar video taste as well. We can use the Youtube API (https://developers.google.com/youtube/v3) and the Spotify API (https://beta.developer.spotify.com/documentation/web-api/). 

## Idea 3: Automatic Creation of Homework Deadlines on GCal 

Every new semester, students receive a syllabus for each of their classes with 20-30 due dates each. It can become hard to keep track of these dates, especially when these classes operate on different platforms, such as BlackBoard, Piazza, Canvas, etc. Our web application will streamline this process by letting students to input the assignment name, due date, and details, before transforming them into Google Calendar events. This application will connect to the Google Calendar API (https://developers.google.com/calendar/api) and Google Sheets API (https://developers.google.com/sheets/api). Therefore, the student will be able to see the event on their calendar, and also be able to easily mark it off as completed in a spreadsheet in Google Sheets. 

