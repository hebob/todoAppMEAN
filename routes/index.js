var express = require('express');
var router = express.Router();

router.get('/partials/:name', function(req, res, next) {
  
    var name = req.params.name;
    console.log(name)
    res.render('partials/' + name);
})

/* GET todo-listing. */
router.get('*', function(req, res, next) {
  res.render('layout')
});

module.exports = router;
