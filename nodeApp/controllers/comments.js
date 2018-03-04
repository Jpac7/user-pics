var express = require('express'),
    router = express.Router(),
    Comment = require('../models/comment')

router.post('/new/:picture', function(req, res) {
    Comment.add('Makitambo', req.params.picture, req.body.comment, function(err, result) {
        res.redirect('/pictures/show/' + req.params.picture)
    })
})

module.exports = router