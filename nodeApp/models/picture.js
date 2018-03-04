var db = require('../db'),
    ObjectID = require('mongodb').ObjectID,
    COLLECTION = 'pictures'

module.exports.add = function(user, name, path, done) {
    var data = {
        user: user,
        name: name,
        path: path,
        insertedOn: new Date().toUTCString()
    }
    db.get().collection(COLLECTION).insert(data, function(err, result) {
        done(err, result)
    })
}

module.exports.get = function(id, done) {
    db.get().collection(COLLECTION).findOne({_id: ObjectID(id)}, function(err, doc) {
        done(err, doc)
    })
}

module.exports.all = function(user, done) {
    db.get().collection(COLLECTION).find({user: user}).toArray(function(err, docs) {
        done(err, docs || [])
    })
}