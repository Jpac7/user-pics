var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth'),
    Comment = require('../models/comment'),
    User = require('../models/user')

router.use(auth)

router.get('/list/:user', function(req, res) {
    var tripPictures = ["pic1", "pic2", "pic3"]
    res.render('pictures/list', {user: req.params.user, pictures: tripPictures})
})

router.get('/show/:id', function(req, res) {
    Comment.all(req.params.id, function(err, comments) {
        res.render('pictures/show', {id: req.params.id, comments: comments})
    })
})

module.exports = router