var express = require('express'),
    router = express.Router()

router.use('/pictures', require('./pictures'))
router.use('/comments', require('./comments'))

router.get('/', function(req, res) {
    res.render('index')
})

router.get('/team', function(req, res) {
    res.render('team')
})

router.get('/about', function(req, res) {
    res.render('about')
})

module.exports = router
