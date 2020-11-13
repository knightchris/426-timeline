var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  return res.status(200).json({ msg: 'Welcome to the timeline api'});
});

router.get('/welcome', function(req,res, next) {
  return res.status(200).json({msg: 'hello'});
});

module.exports = router;