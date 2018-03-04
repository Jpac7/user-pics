var db = require('../db'), 
    crypto = require('crypto'),
    COLLECTION = 'users'


function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64')
}

module.exports.create = function(name, email, password, done) {
    var data = {
        name: name,
        email: email,
        password: hash(password),
        createdOn: new Date().toUTCString()
    }

    db.get().collection(COLLECTION).insert(data, function(err, doc) {
        done(err, doc)
    })
}

module.exports.authenticate = function(email, password, done) {
    db.get().collection(COLLECTION).findOne({email: email}, function(err, doc) {
        if(!err && doc && doc.password === hash(password)) {
            return done(null, doc)
        }
        done(err)
    })
}
