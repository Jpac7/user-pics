var express = require('express'),
    router = express.Router(),
    Comment = require('../models/comments')

router.get('/list/:user/:trip', function(req, res) {
    var tripPictures = ["pic1", "pic2", "pic3"]
    res.render('pictures/list', {user: req.params.user, trip: req.params.trip, pictures: tripPictures})
})

router.get('/show/:id', function(req, res) {
    Comment.all(req.params.id, function(err, comments) {
        res.render('pictures/show', {id: req.params.id, comments: comments})
    })
})

module.exports = router