var express = require('express');
var router = express.Router();
var dbf = require('../dbfetcher');

/* GET all lists. */
router.get('/', function(req, res, next) {
    //connect to mongodb
    dbf.getdb("list", function(collection) {
        collection.find().toArray(function (err, results) {
            if (err) {
                res.send(err);
            } else {
                console.log(results);
                res.json(results);
            }
        });
    })
});

/* GET single list */
router.get('/:id', function(req, res, next) {
    dbf.getdb("list", function(collection) {
        collection.find({id: parseInt(req.params.id)}).toArray(function (err, results) {
            if (err) {
                res.send(err);
            } else {
                console.log("results: ", results[0]);
                res.json(results[0]);
            }
        });
    })
});

/*create a new list */
router.put('/', function(req, res, next) {
    dbf.getdb("list", function(collection) {
        collection.find().toArray(function (err, results) {
            if (err) {
                res.send(err);
            } else {
                var listid;
                console.log(results);
                if(results.length > 0) {
                    listid = results[results.length - 1].id + 1;
                } else {
                    listid = 1;
                }
                dbf.getdb("list", function(collection) {
                    collection.insertOne({
                        id: listid,
                        name: req.body.name,
                        desc: req.body.desc,
                        added: new Date(),
                        done: false,
                        todos: []
                    }, function(err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.status(200).json(result);
                        }
                    });
                });
            }
        });
    })    
})

/* edit a list */
router.post('/:id', function(req, res, next) {
    dbf.getdb("list", function(collection) {
        console.log("about to do post");
        collection.update(
            {id: parseInt(req.params.id, 10)},
            {$set: {name: req.body.name, desc: req.body.desc}}, // replacement, replaces only the field "hi"
            function(err, object) {
                if (err){
                    console.log(err)
                    console.warn(err.message);  // returns error if no matching object found
                } else {
                    console.log("post complete")
                    res.status(200).json(object);
                }
        });
  })
})

/* edit todos of a list */
router.post('/todos/:id', function(req, res, next) {
    console.log("post: ", req.body)
    console.log("id: ", req.params.id)
    dbf.getdb("list", function(collection) {
        console.log("about to do post");
        collection.update(
            {id: parseInt(req.params.id, 10)},
            {$set: {todos: req.body.todos, done: req.body.done}}, // replacement, replaces only the field "hi"
            function(err, object) {
                if (err){
                    console.log(err)
                    console.warn(err.message);  // returns error if no matching object found
                } else {
                    console.log("post complete")
                    res.status(200).json(object);
                }
        });
  })
})


/*DELETE a list */
router.delete('/:id', function(req, res, next) {
    dbf.getdb("list", function(collection) {
        collection.deleteOne(
            {id: parseInt(req.params.id, 10)},
            function(err, results) {
                if (err){
                    console.log(err)
                    console.warn(err.message);  // returns error if no matching object found
                } else {
                    console.log("delete complete")
                    res.status(204).json(results);
                }
        });
  })
})

module.exports = router;

/*
Database schema: one document holds list AND it's todos
list = {
    id: is this required?
    name: "listlist",
    desc: "yes this is a list",
    added: date,
    done: boolean,
    todos: [
        {
            task: "do exercise",
            priority: int,
            added: date,
            done: boolean
        },
        {
            name: "chill out",
            priority: int,
            added: date,
            done: boolean
        }
    ]
    
}

*/