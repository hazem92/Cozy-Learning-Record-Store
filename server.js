
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cozydb = require('cozydb');


/*
    Configuration section.
*/
//app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({
  extended: true
}));


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

      console.log('Cozy Learning Record Store app listening at http://%s:%s', host, port);
    });
});
