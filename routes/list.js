var express = require('express');
var router = express.Router();

//MODEL: todo has a task, and a date added,
//       and a completed boolean

//TODO: make backlog wiev!

var todos = [
  {
    task: "watch tv",
    priority: 1,
    added: "2015-10-09",
    done: false
  },
  {
    task: "eat shit",
    priority: 2,
    added: "2015-08-19",
    done: false
  },
  {
    task: "make joke",
    priority: 2,
    added: "2015-08-09",
    done: false
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', { title: 'Todo-app', todo_items: todos });
});

module.exports = router;
