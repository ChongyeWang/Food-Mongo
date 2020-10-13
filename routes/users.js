var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({ x: 5, y: 6 }));
});

module.exports = router;
