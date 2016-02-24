/**
 * Module dependencies.
 */
var passport = require('passport')
  , login = require('connect-ensure-login')


exports.index = function(req, res) {
  res.status(200).send('Hello, We are building a nice Learning Record Store in your cozy world and adding an OAuth 2.0 Server :) ');
};

exports.loginForm = function(req, res) {
  res.render('login');
};

exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/public', failureRedirect: '/public/login' });

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/public');
}

exports.account = [
  login.ensureLoggedIn(),
  function(req, res) {
    res.render('account', { user: req.user });
  }
]
