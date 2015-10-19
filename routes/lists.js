var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('lists', {title: "Todo-lists"})
});

router.post('/', function(req, res, next) {
  res.render('lists', {title: "Todo-lists"})
});

module.exports = router;
