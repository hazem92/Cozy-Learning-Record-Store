
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cozydb = require('cozydb');
var path = require('path');
var passport = require('passport');
var http = require('http');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var auth = require ('./server/auth');
var oauth2 = require('./server/oauth2');
var user = require('./server/user');
var util = require('util');
var logger = require ('logger');
//global.appRoot = path.resolve(__dirname);

/*
    Configuration section.
*/
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat Br01'}));
//app.use(logger.logger());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');

/*
    Define routes and their handler.
*/
var indexController = require('./server/controllers/index');
app.use(indexController);
var statementController = require('./server/controllers/statement');
app.use(statementController);
var actorController = require('./server/controllers/actor');
app.use(actorController);
var activityController = require('./server/controllers/activity');
app.use(activityController);
var verbController = require('./server/controllers/verb');
app.use(verbController);
var publicController = require('./server/controllers/public');
app.use(publicController);

//export server for test
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

require('./server/auth');

/*
    CouchDB views initialization. It must be done before starting the server.
*/
cozydb.configure(__dirname, null, function() {
    /*
        Start the HTTP server.
    */
    var server = app.listen(9250, function () {
      var host = server.address().address;
      var port = server.address().port;

      //export server for test
      body.data = server;
      body.emit('update');

      console.log('Cozy Learning Record Store app listening at http://%s:%s', host, port);
    });
});

//export server for test
body.on('update', function () {
    var server = body.data ;
    console.log("call update");
    module.exports = server ;
    console.log(server);

  });
