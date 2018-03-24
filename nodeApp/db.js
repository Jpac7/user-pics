var MongoClient = require('mongodb').MongoClient,
    async = require('async')

var conn = {
    db: null,
    mode: null
}

var URI_PRODUCTION = 'mongodb://localhost:27017/',
    URI_TEST = 'mongodb://localhost:27017/'

var MODES = {
    PRODUCTION: 'production',
    TEST: 'test'
}

exports.MODES = MODES

exports.connect = function(database, mode, done) {
    var uri = mode === MODES.PRODUCTION ? URI_PRODUCTION.concat(database) : URI_TEST.concat(database).concat('_test')

    MongoClient.connect(uri, function(err, client) {
        if (err) return done(err)
        conn.db = client.db(database)
        conn.mode = mode
        done(null, conn.db)
    })
}

exports.get = function() {
    return conn.db
}

exports.close = function(done) {
    conn.db.close(function(err) {
        done(err)
    })
}

exports.drop = function(done) {
    conn.db.collections(function(err, collections) {
        if (err) return done(err)

        async.each(collections, function(collection, cb) {
            if(collection.collectionName.indexOf('system') > -1) return cb()
            collection.remove(cb)
        }, done)
    })
}

exports.fixtures = function(data, done) {
    var names = Object.keys(data.collections)

    async.each(names, function(name, cb) {
        conn.db.createCollection(name, function(err, collection) {
            if (err) return cb(err)
            collection.insertMany(data.collections[name], cb)
        })
    }, done)
}