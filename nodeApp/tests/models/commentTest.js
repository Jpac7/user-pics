'use strict';

let db = require('../../db'),
    should = require('should'),
    startData = require('../data/models/comment-data.json'),
    Comment = require('../../models/comment')

describe('Comment model tests', function() {
    before(function(done) {
        db.connect('travelAlbums_test', db.MODES.TEST, done);
    }),
    beforeEach(function(done) {
        db.drop(function(err,result) {
            if (err) return done(err)
            db.fixtures(startData, done)
        })
    }),
    it('all comments for a picture', function(done) {
        Comment.all("555", function(error, comments) {
            should.not.exist(error)
            comments.length.should.equal(2)
            done()
        })
    }),
    it('all comments for a non-existent picture', function(done) {
        Comment.all('001', function(error, comments) {
            should.not.exist(error)
            comments.length.should.equal(0)
            done()
        })
    }),
    it('add comment to existent picture', function(done) {
        let comment = {
            user: "aaaaaaaaaaaaaaaaaaaaaaaa",
            picture: "123",
            text: "Test this comment!"
        }
        Comment.add(comment.user, comment.picture, comment.text, function(err, doc) {
            should.not.exist(err)
            should.exist(doc)
            Comment.all(comment.picture, function(err, comments) {
                should.not.exist(err)
                comments.length.should.equal(2)
                comments[1].user.should.equal(comment.user)
                comments[1].picture.should.equal(comment.picture)
                comments[1].comment.should.equal(comment.text)
                done()
            })
        })
    })
})