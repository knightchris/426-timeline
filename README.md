# Star Wars Timeline
Our project is a timeline visualization for books, comics, movies, and shows inside the Star Wars universe. These will be sortable by date released or fictional date occured.


## Teammates:
- Nathan Urquhart
- Sheridan Battaile
- Chris Knight
- Anthony Michaels

## Development
This project is split into two sides, the client and the server/api.
Look within each folder to find the [client readme](./client/README.md) and the [server readme](./api/README.md)

## Getting Started

- Install PostgreSQL locally on your machine
- PGadmin tool provides a GUI, may be useful 
- Setup instance of database using dump (forthcoming) 
    - For now, can just set up your own database and add a Users table as the code only touches "SELECT * FROM Users;"
        - For help refer to doc which should have been added when downloading PG (probably in C:/Program%20Files/PostgreSQL/13/doc/postgresql/html/tutorial-createdb.html if windows)
- Create .env file in api subdir with DATABASE_URL_DEV=postgresql://postgres:<pg-admin-pass>@localhost:5432/<local-db-name>
    - This tells PG where your local database is running
    - If using PGadmin tool the <pg-admin-pass> will be configured when first running it
- Add SESSION_SECRET=<your-session-secret> to .env for express-session

### Local Development

- The entire app can be run locally on localhost:3000. 
- If changes are made to the client portion (react side), run command `npm run build` in `426-timeline/client` and copy the contents of the build directory
  into the public directory of `426-timeline/api` and then run `npm run start` in `426-timeline/api`
- If changes are not made to the client portion there is no need to rebuild the react app, simply restart the server by running `npm run start` in `426-timeline/api`
- Use psql on the cmd line to play with database or pgadmin gui locally

### Deployment

- For now, we will try using one account until we can get a CI tool running (this may not work)
- Download the Heroku CLI
- Log into CLI through the account and password given (`heroku login --interactive`)
- Run `git subtree push --prefix api heroku master` from within root dir `426-timeline` to deploy (this only deploys the api dir with the build files placed in public, 
  the client dir should not be deployed)

### Production Database

- Ensure you are logged into heroku first
- Run `heroku pg:psql` from `426-timeline` dir to enter heroku db

### Database schema

- View schema: https://docs.google.com/spreadsheets/d/1AXj4h4XO7tni1glgYUH2RVzvZ0oYRZoVc4NtZAP6S2w/edit?usp=sharing

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


### Media Card resource
 - The main RESTful resource that the frontend manipulates is the Media Card. Media Card objects have properties:

| name                | type     | example                          | description                                                                                                  |
|---------------------|----------|----------------------------------|--------------------------------------------------------------------------------------------------------------|
| mediaid             | integer  | 42                               | Unique ID assigned to a  Media card by the database                                                          |
| mediatype           | string   | "movie"                          | Specifies the media card type, must be: ["movie", "book", "comic", "television"]                             |
| title               | string   | "Star Wars:  Return of the Jedi" | The title of the media                                                                                       |
| description         | string   | "This movie was  the best one"   | A description of the media                                                                                   |
| pubdate             | date     | "2020-02-21T05:00:00.000Z"       | Date the media was published                                                                                 |
| unidate             | date     | "3653 BBY"                       | Date the media occurred within the  star wars universe                                                       |
| approved            | boolean  | true                             | Whether or not the media card  has been approved by an admin                                                 |
| creator             | string   | "Lucasfilm Ltd."                 | Producer of the media                                                                                        |
| rating              | float    | 9.7                              | Rating of the media by IMDB- only used by media type ["movie", "television"] null for type ["comic", "book"] |
| contributors        | string[] | ['Thomas', 'John']               | A list of the usernames that have  contributed to the content of this media card                             |
| proposedmediaeditid | int      | 10                               | Field used to point a pending edit card to the original                                                      |



## API Documentation

### Endpoint 1: Index
- Purpose:
  - Retrieves a list of all approved or unapproved Media Cards as a JSON array
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/mediacards
- Request Params:
  - approved (boolean) - Required. Specifies which class of Media Cards to retrieve. True returns all approved cards, false returns all unapproved cards
- Response:
  - Responds with an array in JSON format containing the selected Media Cards.

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/mediacards',
  withCredentials: true,
  data: {
    "approved": true
  },
}); 
``` 
#### Example Response
``` 
200 OK 
[
    {
        "mediaid": 1,
        "mediatype": "movie",
        "title": "SW: Third Movie",
        "description": "A really good one",
        "pubdate": "2020-02-21T05:00:00.000Z",
        "unidate": "3653 BBY",
        "approved": true,
        "creator": "Disney",
        "rating": 9.7,
        "proposededitmediaid": null,
        "contributors": [
            "Chris",
            "Sally"
        ]
    },
    {
        "mediaid": 2,
        "mediatype": "movie",
        "title": "SW: Second Movie",
        "description": "A really bad one",
        "pubdate": "2020-02-25T05:00:00.000Z",
        "unidate": "3653 BBY",
        "approved": true,
        "creator": "Disney",
        "rating": 4.3,
        "proposededitmediaid": null,
        "contributors": [
            "Chris"
        ]
    }
]
```

### Endpoint 2: Find card
- Purpose:
  - Find a specific card given a mediaid
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/findcard
- Request Params:
  - mediaid (string) - Required. Specifies the card by mediaid to retrieve from the database
- Response:
  - Upon success, responds the fields of the requested Media Card in JSON format

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/findcard',
  withCredentials: true,
  data: {
    "mediaid": 10
  },
}); 
``` 
#### Example Response
```
200 OK
{
    "mediaid": 10,
    "mediatype": "book",
    "title": "Star Wars Book",
    "description": "A million pages long, don't read",
    "pubdate": "2020-02-21T05:00:00.000Z",
    "unidate": "3653 BBY",
    "approved": true,
    "creator": "Some author",
    "rating": null,
    "proposededitmediaid": null,
    "contributors": [
        "John",
        "Chris"
    ]
}
```

### Endpoint 3: Create
- Purpose:
  - Create a new Media Card in the database if nonadmin, create and approve new media card if admin
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/createcard
- Request Params:
  - mediatype (string) - Required. Specifies media type of this card, ["movie", "television", "book", "comic"]
  - title (string) - Required. Specifies title of the media
  - description (string) - Required. Specifies description of the media
  - pubdate (string) - Required. Specifies date media published (string formatted like YYYY-MM-DD)
  - unidate (string) - Required. Specifies date media occured in star wars universe (string formatted like 3653 BBY)
  - creator (string) - Required. Specifies the creator of the media
- Response:
  - Responds with JSON containing created Media Card's data

  #### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/createcard',
  withCredentials: true,
  data: {
    "mediatype": "book",
    "title": "Star Wars Book",
    "description": "Greatest book of all time",
    "pubdate": "2020-02-21",
    "unidate": "3653 BBY",
    "creator": "Some book author"
  },
}); 
``` 
#### Example Response
```
200 OK
{
    "mediaid": 10,
    "mediatype": "book",
    "title": "Star Wars Book",
    "description": "Greatest book of all time",
    "pubdate": "2020-02-21T05:00:00.000Z",
    "unidate": "3653 BBY",
    "approved": false,
    "creator": "Some book author",
    "rating": null,
    "proposededitmediaid": null,
    "contributors": [
        "John"
    ]
}
```

### Endpoint 4: Edit
- Purpose:
  - Suggest to edit a media card in the database, given it does not have an existing pending edit. Admin/non-admin behavior is the same, edit not automatically approved
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/editcard
- Request Params:
  - mediatype (string) - Required. Specifies media type of this card, ["movie", "television", "book", "comic"]
  - title (string) - Required. Specifies title of the media
  - description (string) - Required. Specifies description of the media
  - pubdate (string) - Required. Specifies date media published (string formatted like YYYY-MM-DD)
  - unidate (string) - Required. Specifies date media occured in star wars universe (string formatted like 3653 BBY)
  - creator (string) - Required. Specifies the creator of the media
  - proposededitmediaid (int) - Required. Specifies the original card proposed edits will be made on. If this field is not null the card is a pending edit
- Response:
  - Upon success, responds with empty response body

  #### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/editcard',
  withCredentials: true,
  data: {
    "mediatype": "book",
    "title": "Star Wars Book",
    "description": "Greatest book of all time",
    "pubdate": "2020-02-21",
    "unidate": "3653 BBY",
    "creator": "Some book author"
    "proposededitmediaid": 10
  },
}); 
``` 
#### Example Response
```
200 OK
```

### Endpoint 5: Delete
- Purpose:
  - Delete a Media Card in the database
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/deletecard
- Request Params:
  - mediaid (int) - Required. Specifies the mediaid to be deleted from the database
- Response:
  - Upon success, responds with empty response body

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/deletecard',
  withCredentials: true,
  data: {
    "mediaid": 11,
  },
}); 
``` 
#### Example Response
```
204 No content
```

### Endpoint 6: Approve new card
- Purpose:
  - Approve a Media Card in the database
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/approvenewcard
- Request Params:
  - mediaid (int) - Required. Specifies the media by mediaid to be approved in the database
- Response:
  - Upon success, responds with empty response body

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/approvenewcard',
  withCredentials: true,
  data: {
    "mediaid": 11,
  },
}); 
``` 
#### Example Response
```
200 OK
```

### Endpoint 7: Approve card edit
- Purpose:
  - Approve a proposed Media Card edit in the database
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/approveeditcard
- Request Params:
  - username (string) - Required. Specifies the user who suggested the edit request
  - mediaid (int) - Required. Specifies the edit request by mediaid to be approved in the database (this is the id of the edit request, the request itself points to the original)
- Response:
  - Upon success, responds with empty response body

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/approveeditcard',
  withCredentials: true,
  data: {
    "username": "John",
    "mediaid": 11,
  },
}); 
``` 
#### Example Response
```
200 OK
```

### Endpoint 8: Login
- Purpose:
  - Allow a user to login to the website, get info on user
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/login
- Request Params:
  - username (string) - Required. Specifies the username
  - password (int) - Required. Specifies the user's password
- Response:
  - Upon success, responds with the username of the logged in user, their contribution count, admin status(boolean) as JSON

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/login',
  withCredentials: true,
  data: {
    "username": "John",
    "password": "supersecurepassword",
  },
}); 
``` 
#### Example Response
```
200 OK
{
    "username": "John",
    "contributioncount": 8
    "admin": true
}
```

### Endpoint 9: Logout
- Purpose:
  - Allow a user to logout of the website
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/logout
- Request Params:
  - None
- Response:
  - Upon success, responds with true value formatted as JSON

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/logout',
  withCredentials: true,
}); 
``` 
#### Example Response
```
200 OK
```

### Endpoint 10: Check login
- Purpose:
  - Check if a user is logged in, return the username if true and their contribution count and admin status
- Endpoint:
  - GET https://comp426-timeline.herokuapp.com/checklogin
- Request Params:
  - None
- Response:
  - Upon success, responds with the username of the logged in user, their contribution count, admin status(boolean) as JSON

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'get',
  url: 'https://comp426-timeline.herokuapp.com/checklogin',
  withCredentials: true,
}); 
``` 
#### Example Response
```
200 OK
{
    "username": "Chris",
    "contributioncount": 8
    "admin": true
}
```

### Endpoint 11: Create user
- Purpose:
  - Allow a user to register on the website
- Endpoint:
  - POST https://comp426-timeline.herokuapp.com/createuser
- Request Params:
  - username (string) - Required. Specifies the username
  - password (string) - Required. Specifies the user's password
- Response:
  - Upon success, responds with 200 OK

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'post',
  url: 'https://comp426-timeline.herokuapp.com/createuser',
  withCredentials: true,
  data: {
    "username": "John",
    "password": "supersecurepassword"
  },
}); 
``` 
#### Example Response
```
200 OK
```

### Endpoint 12: Update ratings
- Purpose:
  - Allows an admin to update the cached iMDB ratings of movies
- Endpoint:
  - GET https://comp426-timeline.herokuapp.com/updateratings
- Request Params:
  - None
- Response:
  - Upon success, responds with 200 OK

#### Example Axios Request 
 ```
 const result = await axios({
  method: 'get',
  url: 'https://comp426-timeline.herokuapp.com/updateratings',
  withCredentials: true,
}); 
``` 
#### Example Response
```
200 OK
```

### Rough description of frontend composition

- MainTimeline consists of (RegularCard(s), Header, Sidebar)
- Header consists of (Login, Logout, CreateUser, AdminPageLink)
- Sidebar(Filter, Sort, Search, CreateNewCardButton)
- CreateNewCardButton(EditFormWithNoId, SubmitCreateButton)
<br><br>
- RegularCard(ModalViewOfCard)
- ModalViewOfCard(Information, EditButton[if logged in], DeleteButton[if admin])
- EditButton(EditForm, SubmitEditButton)
<br><br>
- AdminTimeline consists of (ComparisonCard[which is a regular card at heart], ToBeApprovedCard, Header, UpdateRatingsButton)
- ToBeApprovedCard(Information, ApproveEditButton/ApproveNewCardButton, DeleteButton[decline])

