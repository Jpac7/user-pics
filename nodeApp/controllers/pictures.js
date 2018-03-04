var express = require('express'),
    router = express.Router(),
    auth = require('../middleware/auth'),
    multer = require('multer')
    Comment = require('../models/comment'),
    User = require('../models/user'),
    Picture = require('../models/picture')

// router.use(auth)

const upload = multer({dest: __dirname + '/../public/uploads/'})

router.get('/list/:user', auth, function(req, res) {
    Picture.all(req.params.user, function(err, pictures) {
        res.render('pictures/list', {user: req.session.user.name, pictures: pictures})
    })
})

router.get('/show/:id', function(req, res) {
    Picture.get(req.params.id, function(err, picture) {
        Comment.all(req.params.id, function(err, comments) {
            res.render('pictures/show', {picture: picture, comments: comments})
        })
    })  
})

router.post('/upload', auth, upload.single('picture'), function(req, res) {
    console.log(req.session.user._id, req.file.filename, req.file.path)
    Picture.add(req.session.user._id, req.file.filename, req.file.path, function(err, docs) {
        res.redirect('/pictures/list/' + req.session.user._id)
    })
})

module.exports = router