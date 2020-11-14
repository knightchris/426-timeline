var express = require('express');
require('dotenv').config();
var router = express.Router();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
  sslmode: process.env.DATABASE_URL ? "require" : "disable"
});


router.get('/', function(req, res, next) {
  return res.status(200).json({ msg: 'Welcome to the timeline api'});
});

router.get('/users', function(req,res, next) {
  
  pool.query('SELECT * FROM Users;', (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
});

});

module.exports = router;