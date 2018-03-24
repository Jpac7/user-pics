'use strict';

let db = require('../../db'),
    should = require('should'),
    picturesData = require('../data/models/picture-data.json'),
    Picture = require('../../models/picture')


describe('Picture model test', function() {
    before(function(done) {
        db.connect('travelAlbums_test', db.MODES.TEST, done)
    }),
    beforeEach(function(done) {
        db.drop(function(err, r) {
            if(err) done(err)
            db.fixtures(picturesData, done)
        })
    }),
    it('Add new picture', function(done) {
        let picture = {
            user: '5a9c08349be82943c7a0aa0y',
            name: 'myhollidaysInVenice',
            path: '/home/jpac/MyProjects/nodeApp/public/uploads/myhollidaysInVenice'
        }
        Picture.add(picture.user, picture.name, picture.path, function(err, result) {
            should.not.exist(err)
            should.exist(result)
            Picture.all(result.user, function(err, pics) {
                should.not.exist(err)
                should.exist(pics)
                pics.length.should.equal(3)
                pics[2].user.should.equal(picture.user)
                pics[2].name.should.equal(picture.name)
                pics[2].path.should.equal(picture.path)
                done()
            })
        })
    }),
    it('Get picture by _id', function(done) {
        // Getting picture _id from Picture.all for user
        Picture.all("5a9c08349be82943c7a0aa0n", function(err, pics) {
            should.not.exist(err)
            should.exist(pics)

            Picture.get(pics[0]._id, function(err, pic) {
                should.not.exist(err)
                should.exist(pic)
                pic.user.should.equal('5a9c08349be82943c7a0aa0n')
                pic.name.should.equal('384e5925dd2504ca07efcc666592976y')
                pic.path.should.equal('/home/jpac/MyProjects/nodeApp/public/uploads/384e5925dd2504ca07efcc666592976y')
                pic.insertedOn.should.equal('Thu, 15 Mar 2018 15:10:10 GMT')
                done()
            })
        })
    }),
    it('Get all pictures for user', function(done) {
        Picture.all("5a9c08349be82943c7a0aa0y", function(err, pics) {
            should.not.exist(err)
            should.exist(pics)
            pics.length.should.equal(2)
            done()
        })
    })
})