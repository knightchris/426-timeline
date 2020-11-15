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
