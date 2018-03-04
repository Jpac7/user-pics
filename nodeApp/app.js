var express = require('express'),
    app = express(),
    db = require('./db')

// template engine
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

// in production => public static files better served by nginx or apache
app.use('/public', express.static(__dirname + '/public'))

// middleware
app.use(require('body-parser').urlencoded({extended: true}))

// routes
app.use(require('./controllers'))

db.connect('mongodb://localhost:27017/', 'travelAlbums', function(err) {
    const port = 3000
    app.listen(port, function() {
        console.log('Listening on port ' + port)
    })
})


