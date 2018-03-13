// 'use strict';

const db = require('../db'), 
    crypto = require('crypto'),
    COLLECTION = 'users'

const ERRORS = {
    DB_ERROR: "db_error",
    USER_EXISTS: "user_exists"
}
module.exports.errors = ERRORS

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

    db.get().collection(COLLECTION).findOne({email: email}, function(err, doc) {
        if (err) return done(ERRORS.DB_ERROR)
        if (doc) {
            return done(ERRORS.USER_EXISTS)
        }

        db.get().collection(COLLECTION).insert(data, function(err, result) {
            if (err, {}) return done(ERRORS.DB_ERROR)
            done(null, result.nInserted !== 0 ? result.ops[0] : {})
        })
    })
}

module.exports.authenticate = function(email, password, done) {
    db.get().collection(COLLECTION).findOne({email: email}, function(err, doc) {
        if (err) {
            return done(ERRORS.DB_ERROR)
        } else if(doc && doc.password === hash(password)) {
            return done(null, doc)
        } else {
            done()
        }
    })
}
