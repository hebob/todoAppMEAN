var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var url = "mongodb://" + process.env.IP + ":27017/lists";

var db;

client.connect(url, function(err, database) {
    if(err) throw err;
    
    db = database;
})

this.getdb = function(docName, callback) {
        var collection = db.collection(docName);
        callback(collection);
}
/*
Database schema: one document holds list AND it's todos
list = {
    name: "listlist",
    desc: "yes this is a list",
    added: date,
    done: boolean,
    todos: [
        {
            name: "do exercise",
            added: date,
            priority: int,
            done: boolean
        },
        {
            name: "chill out",
            added: date,
            priority: int,
            done: boolean
        }
    ]
    
}

*/