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
        var context = {
            user: req.session.user.name, 
            pictures: pictures
        }

        if (err) {
            context.alert = 'Unable to load pictures. Please, try again.'
        } else if(req.query.alert) {
            context.alert = req.query.alert
        }

        res.render('pictures/list', context)
    })
})

router.get('/show/:id', function(req, res) {
    Picture.get(req.params.id, function(err, picture) {
        if (err) {
            return res.render('pictures/show', {
                alert: 'Unable to load picture. Please try again.',
                comments: []
            })
        } else if(!picture) {
            return res.render('pictures/show', {
                comments: []  
            })
        } 

        Comment.all(req.params.id, function(err, comments) {
            if (err) {
                return res.render('pictures/show', {
                    picture: picture,
                    alert: "Unable to load comments. Please try again."
                })
            }

            res.render('pictures/show', {
                picture: picture,
                comments: comments,
                alert: req.query.alert
            })
        })
    })  
})

router.post('/upload', auth, upload.single('picture'), function(req, res) {
    Picture.add(req.session.user._id, req.file.filename, req.file.path, function(err, result) {
        var url = '/pictures/list/' + req.session.user._id
        if (err) {
            url += '?alert=Unable to upload picture. Please try again later.'
        }
        res.redirect(url)
    })
})

module.exports = router