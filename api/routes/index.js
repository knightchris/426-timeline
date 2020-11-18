const axios = require('axios');
var express = require('express');
require('dotenv').config();
var router = express.Router();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
  sslmode: process.env.DATABASE_URL ? "require" : "disable"
});


router.post('/login', function(req, res) {
  let user = req.body.username;
  let givenPassword = req.body.password;
  
  let sql = 'SELECT username, password FROM Users WHERE username=$1';
  let values = [user];

  pool.query(sql, values, (err, result) => {
    if (!result.rows[0]) {
      return res.status(200).send("User not found");
    }
  
    if (result.rows[0].password == givenPassword) {
      req.session.user = user;
      res.status(200).json(true);
    } else {
      res.status(200).send("Incorrect password");
    }
  })

});

router.post('/logout', function(req, res) {
  delete req.session.user;
  res.status(200).json(true);
});

router.get('/checklogin', async function(req, res) {
  if (req.session.user == undefined) {
     return res.status(200).send("You are not logged in");
  } else {
    let user = req.session.user;
    let values = [user];
    let sql = `SELECT *
    FROM MediaAuthor MA, Users U, Media M
    WHERE U.username=MA.username AND MA.mediaid=M.mediaid AND U.username=$1;`
    let contributionCount = 0;
    let result = await pool.query(sql, values);
    result.rows.forEach((row) => contributionCount++);

    let admin = false;
    sql = `SELECT * FROM Users WHERE username=$1;`
    result = await pool.query(sql, values);
    if (result.rows[0].admin) {
      admin = true;
    } 
    res.status(200).send({"username": req.session.user, "contributioncount": contributionCount, "admin": admin});
  }
});

router.post('/createuser', async function(req, res) {
  let user = req.body.username;
  let password = req.body.password;

  if (password.length < 5 || user.length < 2) {
    return res.status(200).send("Password must be at least 5 characters, user must be at least 2 characters")
  }
  
  let sql = 'SELECT username FROM Users WHERE username=$1;';
  let values = [user];
  let result = await pool.query(sql, values);
  if (result.rows[0]) {
    return res.status(200).send("User already exists");
  } else {
    sql = "INSERT INTO Users values ($1, $2, false)";
    values.push(password);
    result = await pool.query(sql, values);
    res.status(200).send("User successfully created")
  }
});

router.get('/mediacards', async function(req, res) {
  let approved = req.body.approved;
  let values = [approved];

  // Get a list of the unique media id's from the database
  let uniqeMediaIds = [];
  let sql = "SELECT * FROM MediaAuthor MA, Users U, Media M WHERE U.username=MA.username AND MA.mediaid=M.mediaid AND M.approved=$1;"
  let result = await pool.query(sql,values);
  result.rows.forEach((row) =>  { if (uniqeMediaIds.indexOf(row.mediaid) == -1)  uniqeMediaIds.push(row.mediaid)});
  
  // Get a list of contributors parallel to the list of unique media id's
  let contributors = [];
  for (id of uniqeMediaIds) {
    let contributorsToThisMediaId = []
    result.rows.forEach((row) => { if (id === row.mediaid && contributorsToThisMediaId.indexOf(row.username) == -1) contributorsToThisMediaId.push(row.username)})
    contributors.push(contributorsToThisMediaId);
  }
  
  // Append the list of contributors to their respective media cards
  sql = "SELECT * FROM Media WHERE approved=$1;"
  result = await pool.query(sql, values);
  for (let i = 0; i < result.rows.length; i++) {
    result.rows[i].contributors = contributors[i]; 
  }
 
  return res.status(200).json(result.rows);
  
})

router.get('/findcard', async function (req, res) {
  let mediaid = req.body.mediaid;
  let values = [mediaid];
  
  let sql = "SELECT * FROM MediaAuthor WHERE mediaid=$1;"
  let contributors = [];
  let result = await pool.query(sql, values);
  if (!result.rows[0]) {
    return res.status(200).send("Media with given mediaid not found");
  } else {
    result.rows.forEach((row) => { if (contributors.indexOf(row.username) == -1) contributors.push(row.username)});
  }

  sql = "SELECT * FROM Media WHERE mediaid=$1;"
  result = await pool.query(sql, values);
  result.rows[0].contributors = contributors;

  return res.status(200).json(result.rows[0]);
})



router.post('/createcard', async function(req, res) {
  if (req.session.user == undefined) {
    return res.status(200).send("You are not logged in");
  } else {
    let username = req.session.user;
    let mediatype = req.body.mediatype;
    let title = req.body.title;
    let description = req.body.description;
    let pubdate = req.body.pubdate;
    let unidate = req.body.unidate;
    let creator = req.body.creator;
    let rating = null;
    let approved = false;

    let dateregex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    let validMediaTypes = ['book', 'comic', 'movie', 'television'];
    
    if (!mediatype || !title || !description || !pubdate 
        || !unidate || !creator || validMediaTypes.indexOf(mediatype) == -1 || !dateregex.test(pubdate) 
        ) {
      return res.status(200).send("Problem with request parameters")
    }
    
    if (mediatype == "movie" || mediatype == "television") {
      let uriEncodedTitle = encodeURIComponent(title);
      let requestUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${uriEncodedTitle}`
      const response = await axios({
        method: 'get',
        url: requestUrl,
        withCredentials: true,
       }); 
       if (response.data.imdbRating != undefined) {
         rating = response.data.imdbRating;
       }
    }
    
    let sql = "SELECT * FROM Users WHERE username=$1;";
    let values = [username];
    let result = await pool.query(sql, values);
    if (result.rows[0].admin) {  // Auto approve if logged in user is admin
      approved = true;
    }

    values = [mediatype, title, description, pubdate, unidate, approved, creator, rating, null]
    sql = `INSERT INTO Media (mediatype, title, description, pubdate, unidate, approved, creator, rating, proposededitmediaid) 
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
    result = await pool.query(sql, values);
    
 
    values = [result.rows[0].mediaid, username]
    sql = `INSERT INTO MediaAuthor (mediaid, username) values ($1, $2);`
    await pool.query(sql, values);

    result.rows[0].contributors = [username];

    return res.status(200).json(result.rows[0]);
  }
})  

router.get('/updateratings', async function(req, res) {
  if (req.session.user == undefined) {
    return res.status(200).send("You are not logged in");
  } else {
    let user = req.session.user;
    let values = [user];
    let sql = `SELECT * FROM Users WHERE username=$1;`
    let result = await pool.query(sql, values);
    if (!result.rows[0].admin) {
      return res.status(200).send("You are not an admin");
    } 

    result = await pool.query("SELECT * FROM Media;");
    for (row of result.rows) {
      if (row.rating != null) {
        let title = encodeURIComponent(row.title);
        let mediaid = row.mediaid;
        let requestUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`
        const response = await axios({
          method: 'get',
          url: requestUrl,
          withCredentials: true,
         }); 
         if (response.data.imdbRating != undefined) {
           let values = [response.data.imdbRating, mediaid];
           let sql = `UPDATE Media SET rating=$1 WHERE mediaid=$2`
           await pool.query(sql, values);
         }
      }
    }
    return res.status(200).send("Ratings updated");
  }
    
})

router.post('/editcard', async function(req, res) {
  if (req.session.user == undefined) {
    return res.status(200).send("You are not logged in");
  } else {
    let username = req.session.user;
    let mediatype = req.body.mediatype;
    let title = req.body.title;
    let description = req.body.description;
    let pubdate = req.body.pubdate;
    let unidate = req.body.unidate;
    let creator = req.body.creator;
    let proposededitmediaid = req.body.proposededitmediaid;
    let rating = null;
    let approved = false;

    let dateregex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    let validMediaTypes = ['book', 'comic', 'movie', 'television'];
    
    if (!mediatype || !title || !description || !pubdate 
        || !unidate || !creator || validMediaTypes.indexOf(mediatype) == -1 || !dateregex.test(pubdate) 
        ) {
      return res.status(200).send("Problem with request parameters")
    }
    
    // Don't auto approve edits even if user is an admin

    let sql = "SELECT * FROM Media WHERE mediaid=$1;";
    let values = [proposededitmediaid];
    let result = await pool.query(sql, values);
    if (!result.rows[0]) {  
      return res.status(200).send("Proposed media to edit not found with given mediaid");
    }

    sql = "SELECT * FROM Media WHERE proposededitmediaid=$1;"
    result = await pool.query(sql, values);
    if (result.rows[0]) {
      return res.status(200).send("Only one pending edit can exist for a card at a time");
    }

    values = [mediatype, title, description, pubdate, unidate, approved, creator, rating, proposededitmediaid]
    sql = `INSERT INTO Media (mediatype, title, description, pubdate, unidate, approved, creator, rating, proposededitmediaid) 
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
    result = await pool.query(sql, values);
    
 
    values = [result.rows[0].mediaid, username]
    sql = `INSERT INTO MediaAuthor (mediaid, username) values ($1, $2);`
    await pool.query(sql, values);

    result.rows[0].contributors = [username];

    return res.status(200).send();
  }
})

router.post('/deletecard', async function (req, res) {
  if (req.session.user == undefined) {
    return res.status(200).send("You are not logged in");
  } else {
    let username = req.session.user;
    let mediaid = req.body.mediaid;
    
    let sql = "SELECT * FROM Users WHERE username=$1;";
    let values = [username];
    let result = await pool.query(sql, values);
    if (!result.rows[0].admin) {
      return res.status(200).send("You are not an admin");
    }

    sql = "SELECT * FROM Media WHERE mediaid=$1;"
    values = [mediaid];
    result = await pool.query(sql, values);
    if (!result.rows[0]) {
      return res.status(200).send("Media with given mediaid not found");
    }

    sql = "DELETE FROM Media WHERE mediaid=$1;"
    await pool.query(sql, values);

    sql = "DELETE FROM MediaAuthor WHERE mediaid=$1;"
    await pool.query(sql, values);

    return res.status(204).send("No content")
  }
})

router.post('/approvenewcard', async function (req, res) {
  if (req.session.user == undefined) {
    return res.status(200).send("You are not logged in");
  } else {
    let username = req.session.user;
    let mediaid = req.body.mediaid;
    
    let sql = "SELECT * FROM Users WHERE username=$1;";
    let values = [username];
    let result = await pool.query(sql, values);
    if (!result.rows[0].admin) {
      return res.status(200).send("You are not an admin");
    }

    values = [mediaid];
    sql = "SELECT * FROM Media WHERE mediaid=$1;"
    result = await pool.query(sql, values);
    if (!result.rows[0]) {
      return res.status(200).send("Media with given mediaid not found");
    } else if (result.rows[0].proposededitmediaid != null) {
      return res.status(200).send("This card is a proposed edit, not new");
    }

    sql = "UPDATE Media SET approved=true WHERE mediaid=$1"
    await pool.query(sql, values);

    return res.status(200).send();
  }
})

router.post('/approveeditcard', async function (req, res) {
  if (req.session.user == undefined) {
    return res.status(200).send("You are not logged in");
  } else {
    let approverUsername = req.session.user;
    let userWhoProposedEdit = req.body.username;
    let mediaid = req.body.mediaid;
    
    let sql = "SELECT * FROM Users WHERE username=$1;";
    let values = [approverUsername];
    let result = await pool.query(sql, values);
    if (!result.rows[0].admin) {
      return res.status(200).send("You are not an admin");
    }

    let proposedEditMediaId;
    let mediatype;
    let title;
    let description;
    let pubdate;
    let unidate;
    let creator;
    
    values = [mediaid];
    sql = "SELECT * FROM Media WHERE mediaid=$1;"
    result = await pool.query(sql, values);
    if (!result.rows[0]) {
      return res.status(200).send("Media with given mediaid not found");
    } else if (result.rows[0].proposededitmediaid == null) {
      return res.status(200).send("This card is not a proposed edit");
    } else {
      proposedEditMediaId = result.rows[0].proposededitmediaid;
      mediatype = result.rows[0].mediatype;
      title = result.rows[0].title;
      description = result.rows[0].description;
      pubdate = result.rows[0].pubdate;
      unidate = result.rows[0].unidate;
      creator = result.rows[0].creator;
    }

    // Have all edit information including user who proposed edit - delete this proposed edit entry in Media and MediaAuthor
    // then update the original entry with edits and associate this user with the original now as a contributor.
    // Do not copy over approved or rating to original

    // Values is still the mediaid we want to delete
    sql = "DELETE FROM Media WHERE mediaid=$1;"
    await pool.query(sql, values);

    sql = "DELETE FROM MediaAuthor WHERE mediaid=$1;"
    await pool.query(sql, values);

    values = [proposedEditMediaId, userWhoProposedEdit];
    sql = "INSERT INTO MediaAuthor (mediaid, username) values ($1, $2);"
    await pool.query(sql, values);

    values = [proposedEditMediaId, mediatype, title, description, pubdate, unidate, creator]
    sql = `UPDATE Media 
           SET mediatype=$2, title=$3, 
           description=$4, pubdate=$5, 
           unidate=$6, creator=$7, approved=true
           WHERE mediaid=$1;`
    await pool.query(sql, values);

    return res.status(200).send();
  }
})

module.exports = router;