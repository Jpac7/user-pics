var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth'),
    Comment = require('../models/comment')

router.use(auth)

router.post('/new/:picture', function(req, res) {
    Comment.add(req.session.user._id, req.params.picture, req.body.comment, function(err, result) {
        var url = '/pictures/show/' + req.params.picture
        if (err) {
            url += '?alert=Comment not sent. Please, try again later.'
        }
        res.redirect(url)
    })
})

module.exports = router