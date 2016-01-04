var express = require('express');
var router = express.Router();
var Verb = require('../models/verb');

// Create a new Verb
router.post('/verbs', function(req, res, next) {
      Verb.create(req.body, function(err, verb) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else {
            /*
                If everything went well, send the newly created Verb with the
                correct HTTP status.
            */
            res.status(201).send(verb);
        }
    });
});


// Fetch an existing verb
router.get('/verbs/:id', function(req, res, next) {
	Verb.find(req.params.id, function(err, verb) {
		if(err) {
	   		next(err);
		} else if (!verb) {
	    /*
	        If there was no unexpected error, but that the document has not
	        been found, send the legitimate status code. `verb` is null.
	    */
    		res.sendStatus(404);
			} else {
				res.status(200).send(verb);
					}

    });
});


// Update an existing verb
router.put('/verbs/:id', function(req, res, next) {
        //First, get the document we want to update.
		Verb.find(req.params.id, function(err, verb) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else if(!verb) {
            /*
                If there was no unexpected error, but that the document has not
                been found, send the legitimate status code. `verb` is null.
            */
            res.sendStatus(404);
        } else {
            /*
                `verb.updateAttributes` sends a request to the Data System to
                update the document, given its ID and the fields to update.
            */
            Verb.updateAttributes(req.body, function(err, verb) {
                if(err) {
                    /*
                        If an unexpected error occurs, forward it to Express
                        error middleware which will send the error properly
                        formatted.
                    */
                    next(err);
                } else {
                    /*
                        If everything went well, send the fetched verb with the
                        correct HTTP status.
                    */
                    res.status(200).send(verb);
                }
            });
        }
    });
});


// Remove an existing verb
router.delete('/verbs/:id', function(req, res, next) {

    /*
        `Verb.destroy` sends a request to the Data System to update
        the document, given its ID.
    */
    Verb.destroy(req.params.id, function(err) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else {
            /*
                If everything went well, send an empty response with the correct
                HTTP status.
            */
            res.sendStatus(204);
        }
    });

});


/// List of all verb, for a given verb
router.get('/verbs', function(req, res, next) {
    var options =  {
        key: 'Joseph' // need to be fixed
    };
    Verb.request('byID', options, function(err, verbs) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else {
            /*
                If everything went well, send an empty response with the correct
                HTTP status.
            */
            res.status(200).json(verbs);
        }
    });
});

// Export the router instance to make it available from other files.
module.exports = router;
