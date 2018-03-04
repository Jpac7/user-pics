var db = require('../db')

module.exports.add = function(user, picture, comment, cb) {
    var data = {
        user: user,
        picture: picture,
        comment: comment,
        date: new Date().getTime()
    }
    db.get().collection('comments').insertOne(data, function(err, doc) {
        cb(err, doc)
    })
}

module.exports.all = function(picture, cb) {
    db.get().collection('comments').find({picture: picture}).sort(['date', 1])
    .toArray(function(err, docs) {
        cb(err, docs || [])
    })
}