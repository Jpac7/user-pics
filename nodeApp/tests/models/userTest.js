'use strict';

let db = require('../../db'),
    should = require('should'),
    userData = require('../data/models/user-data.json'),
    User = require('../../models/user')

describe('User model tests', function() {
    before(function(done) {
        db.connect('travelAlbums_test', db.MODES.TEST, done)
    }),
    beforeEach(function(done) {
        db.drop(function(err) {
            if (err) return done(err)
            db.fixtures(userData, done)
        })
    }),
    it('Create a new user', function(done) {
        let user = {
            name: "Admin",
            email: "admin@app.com",
            password: "admin",
            passHash: '0DPiKuNIrrVmD8IUCuw1hQxNqZc='
        }
        User.create(user.name, user.email, user.password, function(err, doc) {
            should.not.exist(err)
            should.exist(doc)
            User.authenticate(user.email, user.password, function(err, auth_doc) {
                should.not.exist(err)
                should.exist(auth_doc)
                auth_doc.name.should.equal(user.name)
                auth_doc.email.should.equal(user.email)
                auth_doc.password.should.equal(user.passHash)
                isNaN(Date.parse(auth_doc.createdOn)).should.equal(false)
                done()
            })
        })
    }),
    it('Create a user that already exists', function(done) {
        let user = {
            name: "Melvin",
            email: "melvin@pingo.com",
            password: "xzx",
        }
        User.create(user.name, user.email, user.password, function(err, doc) {
            err.should.equal(User.errors.USER_EXISTS)
            should.equal(doc, undefined)
            done()
        })
    }),
    it('Authenticate user successfully', function(done) {
        let credentials = {
            email: "melvin@pingo.com",
            password: "xzx",
            passHash: "rCr6BTIGpyqLtMZ/5g9Vrx2tdYI="
        }
        User.authenticate(credentials.email, credentials.password, function(err, doc) {
            should.not.exist(err)
            should.exist(doc)
            doc.email.should.equal(credentials.email)
            doc.password.should.equal(credentials.passHash)
            done()
        })
    }),
    it('Authenticate non-existent user', function(done) {
        let credentials = {
            email: "superman@gothan.com",
            password: "xzx",
        }
        User.authenticate(credentials.email, credentials.password, function(err, doc) {
            should.not.exist(err)
            should.not.exist(doc)
            done()    
        })
    })
})