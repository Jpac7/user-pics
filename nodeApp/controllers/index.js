var express = require('express'),
    router = express.Router()

router.use('/users', require('./users'))
router.use('/pictures', require('./pictures'))
router.use('/comments', require('./comments'))

router.get('/', function(req, res) {
    res.render('index', {alert: req.query.alert})
})

router.get('/team', function(req, res) {
    res.render('team')
})

router.get('/about', function(req, res) {
    res.render('about')
})

// router.all('/*', function(req, res) {
//     res.render('index')
// })

module.exports = router

