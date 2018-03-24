'use strict';

let should = require('should'),
    httpMocks = require('node-mocks-http'),
    mockery = require('mockery'),
    User = require('../../models/user')

function createResponse() {
    return httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
}

mockery.registerMock('../models/user', {
    authenticate: function(email, password, done) {
        if(email === 'user@example.com' && password === 'unknown') {
            done(null, {_id: '12345'})
        } else {
            done()
        }
    },
    create: function(name, email, password, done) {
        if(email === 'exists@example.com') {
            done(User.errors.USER_EXISTS)
        } else {
            done(null, {_id: '12345', name: name, email: email, password: password})
        }
    },

    errors: {USER_EXISTS: User.errors.USER_EXISTS}
})

describe('User controller tests', function() {
    before(function() {
        mockery.enable({warnOnUnregistered: false})
        this.controller = require('../../controllers/users')        
    }),
    after(function() {
        mockery.disable()
    }),
    it('Login', function(done) {
        let req = httpMocks.createRequest({
            method: 'POST',
            url: '/login'
        })
        req.body = {email: 'user@example.com', password: 'unknown'}
        req.session = {}

        let res = createResponse()

        res.on('end', function() {
            should.exist(req.session.user)
            req.session.user._id.should.eql('12345')
            res.statusCode.should.eql(302)
            res._getRedirectUrl().should.eql('/pictures/list/12345')
            done()
        })

        this.controller.handle(req, res)
    }),
    it('Login fail', function(done) {
        let req = httpMocks.createRequest({
            method: 'POST',
            url: '/login'
        })
        req.body = {email: 'fail@example.com', password: 'unknown'}
        req.session = {}

        let res = createResponse()

        res.on('end', function() {
            should.not.exist(req.session.user)
            res.statusCode.should.eql(302)
            res._getRedirectUrl().should.eql('/?alert=Wrong email or password.')
            done()
        })

        this.controller.handle(req, res)
    }),
    it('Register', function(done) {
        let req = httpMocks.createRequest({
            method: 'POST',
            url: '/register'
        })
        req.body = {email: 'user@example.com', password: 'unknown', name: 'user'}
        req.session = {}

        let res = createResponse()

        res.on('end', function() {
            should.exist(req.session.user)
            req.session.user._id.should.eql('12345')
            req.session.user.name.should.eql(req.body.name)
            req.session.user.email.should.eql(req.body.email)
            req.session.user.password.should.eql(req.body.password)
            res.statusCode.should.eql(302)
            res._getRedirectUrl().should.eql('/pictures/list/12345')
            done()
        })

        this.controller.handle(req, res)
    }),
    it('Register exists', function(done) {
        let req = httpMocks.createRequest({
            method: 'POST',
            url: '/register'
        })
        req.body = {email: 'exists@example.com', password: 'easyOne', name: 'Vania'}
        req.session = {}

        let res = createResponse()

        res.on('end', function() {
            should.not.exist(req.session.user)
            res.statusCode.should.eql(302)
            res._getRedirectUrl().should.eql('/?alert=That user already exists. Please, choose another.')
            done()
        })

        this.controller.handle(req, res)
    }),
    it('Logout', function(done) {
        let req = httpMocks.createRequest({
            method: 'GET',
            url: '/logout'
        })
        req.session = {user: {_id: '12345'}}

        let res = createResponse()

        res.on('end', function() {
            should.not.exist(req.session.user)
            res.statusCode.should.eql(302)
            res._getRedirectUrl().should.eql('/')
            done()
        })

        this.controller.handle(req, res)
    })
})



