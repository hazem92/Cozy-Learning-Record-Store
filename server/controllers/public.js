var express = require('express');
var router = express.Router();

// Hello world public !
router.get('/public', function(req, res, next) {
    res.status(200).send('Hello, We are building a nice Learning Record Store in your cozy world');
});

router.get('/public/', function(req, res, next) {
    res.redirect("/verbs");
});

module.exports = router;
