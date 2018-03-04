var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth'),
    Comment = require('../models/comment')

router.use(auth)

router.post('/new/:picture', function(req, res) {
    Comment.add(req.session.user._id, req.params.picture, req.body.comment, function(err, result) {
        res.redirect('/pictures/show/' + req.params.picture)
    })
})

module.exports = router