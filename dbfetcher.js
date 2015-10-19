var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var url = "mongodb://" + process.env.IP + ":27017/lists";

this.getdb = function(docName, callback) {
    client.connect(url, function(err, db) {
        if(err) {
            throw err;
        }
        var collection = db.collection(docName);
        callback(collection);
    })
}

this.fetchAll = function(callback) {
    client.connect(url, function(err, db) {
        if(err) {
            throw err;
        }
        
        var collection = db.collection();
    })
}

this.fetch = function (collectionName, callback) {
    client.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        var collection = db.collection(collectionName);

        callback(collection);
    });
};

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