var express = require('express');
var router = express.Router();
var p_site = require('../public_site');
var oauth2 = require ('../oauth2');
var user = require ('../user');


var verbController = require('./verb');
router.use(verbController);

// Hello world public !
router.get('/public', function(req, res, next) {
    res.status(200).send('Hello, We are building a nice Learning Record Store in your cozy world');
});

router.get('/public/verbs', function(req, res, next) {

  var request = require("request");
  var EventEmitter = require("events").EventEmitter;
  var body = new EventEmitter();

/* Need to find a solution for this*/
  request("/verbs", function(error, response, data) {
      body.data = data;
      body.emit('update'); console.log(data) ;
  });

  body.on('update', function () {
    res.status(200).send(body.data); console.log("res") ;
  });

});


// Passport configuration
require('../auth');

router.get('/public', p_site.index);
router.get('/public/login', p_site.loginForm);
router.post('/public/login', p_site.login);
router.get('/public/logout', p_site.logout);
router.get('/public/account', p_site.account);

router.get('/public/dialog/authorize', oauth2.authorization);
router.post('/public/dialog/authorize/decision', oauth2.decision);
router.post('/public/oauth/token', oauth2.token);

router.get('/public/api/userinfo', user.info);

module.exports = router;
