var express = require('express');
var router = express.Router();

// Hello world public !
router.get('/public', function(req, res, next) {
    res.status(200).send('Hello, We are building a nice Learning Record Store in your cozy world');
});

router.get('/public/verbs', function(req, res, next) {

  var request = require("request");
  var EventEmitter = require("events").EventEmitter;
  var body = new EventEmitter();


  request("/verbs", function(error, response, data) {
      body.data = data;
      body.emit('update');
  });

  body.on('update', function () {
    res.status(200).send(body.data); 
  });

});

module.exports = router;
