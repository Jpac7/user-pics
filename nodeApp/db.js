var MongoClient = require('mongodb').MongoClient

var conn = {
    db: null
}

module.exports.get = function() {
    return conn.db
}

module.exports.connect = function(url, database, done) {
    MongoClient.connect(url, function(err, client) {
        conn.db = client.db(database)
        // client.close()
        done(err)
    })
}

module.exports.close = function(done) {
    conn.db.close(function(err) {
        done(err)
    })
}