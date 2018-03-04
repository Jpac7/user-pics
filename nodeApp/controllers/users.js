var router = require('express').Router(),
    User = require('../models/user')

router.post('/login', function(req, res) {
    User.authenticate(req.body.email, req.body.password, function(err, doc) {
        if(doc) {
            req.session.user = doc
            res.redirect('/pictures/list/' + doc._id)
        } else {
            res.redirect('/')
        }
    })    
})

router.get('/logout', function(req, res) {
    req.session.user = undefined
    res.redirect('/')
})

router.post('/register', function(req, res) {
    User.create(req.body.name, req.body.email, req.body.password, function(err, doc) {
        if(doc) {
            req.session.user = doc
            res.redirect('/pictures/list/' + doc._id)
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router