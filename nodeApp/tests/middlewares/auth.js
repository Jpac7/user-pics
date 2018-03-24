'use strict';

let httpMocks = require('node-mocks-http'),
    auth = require('../../middleware/auth')

describe('Auth middleware test', function() {
    it('Anonymous user', function() {
        let req = httpMocks.createRequest();
        let res = httpMocks.createResponse();

        auth(req, res, function() {
            throw new Error('next() should not be called')
        })

        res.statusCode.should.equal(302)
    }),
    it('Logged in user', function(done) {
        let req = httpMocks.createRequest();
        let res = httpMocks.createResponse();

        req.session = {user: 'Bakubim'}

        auth(req, res, done)
    })
})