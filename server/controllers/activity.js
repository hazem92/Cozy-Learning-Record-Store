var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');

// Create a new Activity
router.post('/activities', function(req, res, next) {
      Activity.create(req.body, function(err, activity) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else {
            /*
                If everything went well, send the newly created activity with the
                correct HTTP status.
            */
            res.status(201).send(activity);
        }
    });
});


// Fetch an existing Activity
router.get('/activities/:id', function(req, res, next) {
	Activity.find(req.params.id, function(err, activity) {
		if(err) {
	   		next(err);
		} else if (!activity) {
	    /*
	        If there was no unexpected error, but that the document has not
	        been found, send the legitimate status code. `activity` is null.
	    */
    		res.sendStatus(404);
			} else {
				res.status(200).send(activity);
					}

    });
});


// Update an existing Activity
router.put('/activities/:id', function(req, res, next) {
        //First, get the document we want to update.
		Activity.find(req.params.id, function(err, activity) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else if(!activity) {
            /*
                If there was no unexpected error, but that the document has not
                been found, send the legitimate status code. `activity` is null.
            */
            res.sendStatus(404);
        } else {
            /*
                `Activity.updateAttributes` sends a request to the Data System to
                update the document, given its ID and the fields to update.
            */
            Activity.updateAttributes(req.body, function(err, activity) {
                if(err) {
                    /*
                        If an unexpected error occurs, forward it to Express
                        error middleware which will send the error properly
                        formatted.
                    */
                    next(err);
                } else {
                    /*
                        If everything went well, send the fetched Activity with the
                        correct HTTP status.
                    */
                    res.status(200).send(activity);
                }
            });
        }
    });
});


// Remove an existing Activity
router.delete('/activities/:id', function(req, res, next) {

    /*
        `Activity.destroy` sends a request to the Data System to update
        the document, given its ID.
    */
    Activity.destroy(req.params.id, function(err) {
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

/// List of all Activities
router.get('/activities', function(req, res, next) {

    Activity.request('all', function(err, activities) {
        if(err) {

              //  If an unexpected error occurs, forward it to Express error
              //  middleware which will send the error properly formatted.

            next(err);
        } else {

              //  If everything went well, send an empty response with the correct
              //  HTTP status.

            res.status(200).json(activities);
        }
    });
});

/// Find Activities by type
router.get('/activities/:type', function(req, res, next) {
  var options =  {
      key: req.params.type
  };
    Activity.request('byType', options, function(err, activities) {
        if(err) {

              //  If an unexpected error occurs, forward it to Express error
              //  middleware which will send the error properly formatted.

            next(err);
        } else if (!activities) {
    	    /*
    	        If there was no unexpected error, but that the document has not
    	        been found, send the legitimate status code. `activity` is null.
    	    */
        		res.sendStatus(404);
    			} else {

              //  If everything went well, send an empty response with the correct
              //  HTTP status.

            res.status(200).json(activities);
        }
    });
});

/// Find Activities by name
router.get('/activities/:name', function(req, res, next) {
  var options =  {
      key: req.params.name
  };
    Activity.request('byName', options, function(err, activities) {
        if(err) {

              //  If an unexpected error occurs, forward it to Express error
              //  middleware which will send the error properly formatted.

            next(err);
        } else if (!activities) {
    	    /*
    	        If there was no unexpected error, but that the document has not
    	        been found, send the legitimate status code. `activity` is null.
    	    */
        		res.sendStatus(404);
    			} else {

              //  If everything went well, send an empty response with the correct
              //  HTTP status.

            res.status(200).json(activities);
        }
    });
});


/// List of all Activities, for a given actor !!! Not yet implemented !!!
/*
router.get('/activities', function(req, res, next) {
    var options =  {
        key: 'Joseph' // need to be fixed
    };
    Activity.request('byID', options, function(err, activities) {
        if(err) {

              //  If an unexpected error occurs, forward it to Express error
              //  middleware which will send the error properly formatted.

            next(err);
        } else {

              //  If everything went well, send an empty response with the correct
              //  HTTP status.

            res.status(200).json(activities);
        }
    });
}); */


// Export the router instance to make it available from other files.
module.exports = router;
