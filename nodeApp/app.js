var express = require('express'),
    app = express(),
    db = require('./db'),
    session = require('express-session')

// template engine
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

// in production => public static files better served by nginx or apache
app.use('/public', express.static(__dirname + '/public'))

// middleware
app.use(session({
    secret: 'h&Hlgdi380x1=?$',
    resave: false,
    saveUninitialized: true
}))
app.use(require('body-parser').urlencoded({extended: true}))

// routes middleware
app.use(require('./controllers'))

db.connect('travelAlbums', db.MODES.PRODUCTION, function(err) {
    const port = 3000
    app.listen(port, function() {
        console.log('Listening on port ' + port)
    })
})


