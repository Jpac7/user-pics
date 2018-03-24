var db = require('../db'),
    COLLECTION = 'comments'

var ERRORS = {
    DB_ERROR: "db_error"
}

module.exports.add = function(user, picture, comment, cb) {
    var data = {
        user: user,
        picture: picture,
        comment: comment,
        date: new Date().getTime()
    }
    db.get().collection(COLLECTION).insertOne(data, function(err, result) {
        if (err) return cb(ERRORS.DB_ERROR)
        cb(null, result.ops[0])
    })
}

module.exports.all = function(picture, cb) {
    db.get().collection(COLLECTION).find({picture: picture}).sort(['date', 1])
    .toArray(function(err, docs) {
        if (err) return cb(ERRORS.DB_ERROR)
        cb(null, docs || [])
    })
}