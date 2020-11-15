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
      return res.status(404).send("User not found");
    }
  
    if (result.rows[0].password == givenPassword) {
      req.session.user = user;
      res.status(200).json(true);
    } else {
      res.status(403).send("Incorrect password");
    }
  })

});

router.post('/logout', function(req, res) {
  delete req.session.user;
  res.status(200).json(true);
});

router.get('/checklogin', function(req, res) {
  if (req.session.user == undefined) {
    res.status(403).send("You are not logged in");
  } else {
    res.status(200).send("You are logged in");
  }
});

router.post('/createuser', async function(req, res) {
  let user = req.body.username;
  let password = req.body.password;

  if (password.length < 5 || user.length < 2) {
    return res.status(406).send("Password must be at least 5 characters, user must be at least 2 characters")
  }
  
  let sql = 'SELECT username FROM Users WHERE username=$1;';
  let values = [user];
  let result = await pool.query(sql, values);
  if (result.rows[0]) {
    return res.status(404).send("User already exists");
  } else {
    sql = "INSERT INTO Users values ($1, $2, false)";
    values.push(password);
    result = await pool.query(sql, values);
    res.status(200).send("User successfully created")
  }

  /*
  pool.query(sql, values, (err, result) => {
    if (result.rows[0]) {
      this.continueInsert = false;
      res.status(404).send("User already exists");
    }
  })

  console.log(continueInsert);

  if (!continueInsert) {
    sql = "INSERT INTO Users values ($1, $2, false)"
    pool.query(sql, values, (err,result) => {
      res.status(200).send("User successfully created")
    })
  }
  */
  

  
});



// TODO: Remove intitial testing endpoints below

router.get('/', function(req, res, next) {
  return res.status(200).json({ msg: 'Welcome to the timeline api'});
});

router.get('/users', function(req,res, next) {
  
  pool.query('SELECT * FROM Users;', (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
});

});

router.get('/media', function(req,res, next) {
  
  pool.query('SELECT * FROM Media;', (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
});

});

router.get('/mediaauthor', function(req,res, next) {
  
  pool.query('SELECT * FROM MediaAuthor;', (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
});

});

// End initial testing endpoints


module.exports = router;