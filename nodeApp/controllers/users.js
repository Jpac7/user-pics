var router = require('express').Router(),
    User = require('../models/user')

router.post('/login', function(req, res) {
    User.authenticate(req.body.email, req.body.password, function(err, doc) {
        if(err) {
            res.redirect('/?alert=Unable to login. Please try again later.')
        } else if(doc) {
            req.session.user = doc
            res.redirect('/pictures/list/' + doc._id)
        } else {
            res.redirect('/?alert=Wrong email or password.')
        }
    })    
})

router.get('/logout', function(req, res) {
    req.session.user = undefined
    res.redirect('/')
})

router.post('/register', function(req, res) {
    User.create(req.body.name, req.body.email, req.body.password, function(err, doc) {
        if(err === User.errors.USER_EXISTS) {
            res.redirect('/?alert=That user already exists. Please, choose another.')
        } else if(err || !doc) {
            res.redirect('/?alert=Unable to register. Please try again.')
        } else {
            req.session.user = doc
            res.redirect('/pictures/list/' + doc._id)
        }
    })
})

module.exports = router