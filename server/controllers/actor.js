var express = require('express');
var router = express.Router();
var Actor = require('../models/actor');

// Create a new Actor
router.post('/actors', function(req, res, next) {
      Actor.create(req.body, function(err, actor) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else {
            /*
                If everything went well, send the newly created actor with the
                correct HTTP status.
            */
            res.status(201).send(actor);
        }
    });
});


// Fetch an existing actor
router.get('/actors/:id', function(req, res, next) {
	Actor.find(req.params.id, function(err, actor) {
		if(err) {
	   		next(err);
		} else if (!actor) {
	    /*
	        If there was no unexpected error, but that the document has not
	        been found, send the legitimate status code. `actor` is null.
	    */
    		res.sendStatus(404);
			} else {
				res.status(200).send(actor);
					}

    });
});


// Update an existing actor
router.put('/actors/:id', function(req, res, next) {
        //First, get the document we want to update.
		Actor.find(req.params.id, function(err, actor) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else if(!actor) {
            /*
                If there was no unexpected error, but that the document has not
                been found, send the legitimate status code. `actor` is null.
            */
            res.sendStatus(404);
        } else {
            /*
                `Actor.updateAttributes` sends a request to the Data System to
                update the document, given its ID and the fields to update.
            */
            Actor.updateAttributes(req.body, function(err, actor) {
                if(err) {
                    /*
                        If an unexpected error occurs, forward it to Express
                        error middleware which will send the error properly
                        formatted.
                    */
                    next(err);
                } else {
                    /*
                        If everything went well, send the fetched actor with the
                        correct HTTP status.
                    */
                    res.status(200).send(actor);
                }
            });
        }
    });
});


// Remove an existing actor
router.delete('/actors/:id', function(req, res, next) {

    /*
        `Actor.destroy` sends a request to the Data System to update
        the document, given its ID.
    */
    Actor.destroy(req.params.id, function(err) {
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


/// List of all actor, for a given actor
router.get('/actors', function(req, res, next) {
    var options =  {
        key: 'Joseph' // need to be fixed
    };
    Actor.request('byMbox', options, function(err, actors) {
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
            res.status(200).json(actors);
        }
    });
});

// Export the router instance to make it available from other files.
module.exports = router;
