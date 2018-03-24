const db = require('../db'),
    ObjectID = require('mongodb').ObjectID,
    COLLECTION = 'pictures'

const ERRORS = {
    DB_ERROR: "db_error"
}

module.exports.add = function(user, name, path, done) {
    var data = {
        user: user,
        name: name,
        path: path,
        insertedOn: new Date().toUTCString()
    }
    db.get().collection(COLLECTION).insert(data, function(err, result) {
        if (err) return done(ERRORS.DB_ERROR)
        done(null, result.result.n > 0 ? result.ops[0] : {})
    })
}

module.exports.get = function(id, done) {
    db.get().collection(COLLECTION).findOne({_id: ObjectID(id)}, function(err, doc) {
        if (err) return done(ERRORS.DB_ERROR)
        done(null, doc)
    })
}

module.exports.all = function(user, done) {
    db.get().collection(COLLECTION).find({user: user}).toArray(function(err, docs) {
        if (err) return done(ERRORS.DB_ERROR)
        done(err, docs || [])
    })
}