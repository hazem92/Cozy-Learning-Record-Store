var express = require('express');
var router = express.Router();
var p_site = require('../public_site');
var oauth2 = require ('../oauth2');
var user = require ('../user');


var verbController = require('./verb');
router.use(verbController);


router.get('/public/verbs', function(req, res, next) {

  var request = require("request");
  var EventEmitter = require("events").EventEmitter;
  var body = new EventEmitter();

  var hostname = req.headers.host;
  console.log(hostname);
  var fullurl = "http://" + hostname + "/verbs";

/* Need to find a solution for this*/
  request(fullurl, function(error, response, data) {
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
