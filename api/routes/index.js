var express = require('express');
var router = express.Router();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:ilovecake@localhost:5432/timelinedb',
  sslmode: process.env.DATABASE_URL ? "require" : "disable"
});



router.get('/', function(req, res, next) {
  return res.status(200).json({ msg: 'Welcome to the timeline api'});
});

router.get('/users', function(req,res, next) {
  client.connect();

  client.query('SELECT * FROM Users;', (err, results) => {
    if (err) throw err;
    return res.status(200).json(results.rows);
  
});

});

module.exports = router;