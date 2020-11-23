# API/Backend
Based off suggestions from the [express getting started guide](https://expressjs.com/en/starter/installing.html)
Project was first started using express-generator.

## Prerequisites
Install:
### `node v12.16.0+`

Run:
### `npm install`

## Scripts

In the project directory, you can run:
### `npm start`
Then load http://localhost:3000/ in your browser to see the endpoint

#### Sample SQL

// Duplicate columns occur due to bad schema design (should still function correctly)

mediaid of Media table and id of MediaAuthor table are automatically generated and are ignored in insert statements


// Insert a user into Users and select all rows from Users

INSERT INTO Users values ('Chris', 'pass', true, 0);
SELECT * FROM Users;


// Insert a movie into Media and select all rows from Media.

INSERT INTO Media (mediatype, title, description, pubdate, unidate, approved, creator, rating)
values ('movie', 'SW: Third Movie', 'A really good one', '2020-02-21', '3653 BBY', true, 'Disney', 9.7);
SELECT * FROM Media;


// Insert a row into MediaAuthor and select all rows

INSERT INTO MediaAuthor (mediaid, username) values (1, 'Chris');
SELECT * FROM MediaAuthor;


// Join 2 

SELECT * 
FROM MediaAuthor MA, Users U
WHERE U.username=MA.username;


// Join all (Output gives all media cards contributed to and by whom[one user can contribute to multiple cards])

SELECT *
FROM MediaAuthor MA, Users U, Media M
WHERE U.username=MA.username AND MA.mediaid=M.mediaid;


// Join all (Give the media cards a specific user contributed too)


SELECT *
FROM MediaAuthor MA, Users U, Media M
WHERE U.username=MA.username AND MA.mediaid=M.mediaid AND U.username='Chris';


// Update password in users (finnicky with double quotes)

UPDATE Users
SET password='pass'
WHERE username='John';