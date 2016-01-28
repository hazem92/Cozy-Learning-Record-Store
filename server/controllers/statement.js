var express = require('express');
var router = express.Router();
var Statement = require('../models/statement');

// Create a new statement
router.post('/statements', function(req, res, next) {
      Statement.create(req.body, function(err, statement) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else {
            /*
                If everything went well, send the newly created statement with the
                correct HTTP status.
            */
            res.status(201).send(statement);
        }
    });
});


// Fetch an existing statement
router.get('/statements/:id', function(req, res, next) {
	Statement.find(req.params.id, function(err, statement) {
		if(err) {
	   		next(err);
		} else if (!statement) {
	    /*
	        If there was no unexpected error, but that the document has not
	        been found, send the legitimate status code. `statement` is null.
	    */
    		res.sendStatus(404);
			} else {
				res.status(200).send(statement);
					}

    });
});


// Update an existing statement
router.put('/statements/:id', function(req, res, next) {
        //First, get the document we want to update.
		Statement.find(req.params.id, function(err, statement) {
        if(err) {
            /*
                If an unexpected error occurs, forward it to Express error
                middleware which will send the error properly formatted.
            */
            next(err);
        } else if(!statement) {
            /*
                If there was no unexpected error, but that the document has not
                been found, send the legitimate status code. `statement` is null.
            */
            res.sendStatus(404);
        } else {
            /*
                `Statement.updateAttributes` sends a request to the Data System to
                update the document, given its ID and the fields to update.
            */
            Statement.updateAttributes(req.body, function(err, statement) {
                if(err) {
                    /*
                        If an unexpected error occurs, forward it to Express
                        error middleware which will send the error properly
                        formatted.
                    */
                    next(err);
                } else {
                    /*
                        If everything went well, send the fetched statement with the
                        correct HTTP status.
                    */
                    res.status(200).send(statement);
                }
            });
        }
    });
});


// Remove an existing statement
router.delete('/statements/:id', function(req, res, next) {

    /*
        `Statement.destroy` sends a request to the Data System to update
        the document, given its ID.
    */
    Statement.destroy(req.params.id, function(err) {
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


/// List of all statements
router.get('/statements', function(req, res, next) {

    Statement.request('all', function(err, statements) {
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
            res.status(200).json(statements);
        }
    });
});

/// List of all statements, for a given actor name
router.get('/statements/:actor_name', function(req, res, next) {

// could be changed to fit the view in request0j parameters
    var options =  {
        key: req.params.actor_name
    };
    Actor.request('byName', options, function(err, actor){
      if(err) {
        /*
            If an unexpected error occurs, forward it to Express error
            middleware which will send the error properly formatted.
        */
        next(err);
      } else if(!actor) {
        /*
            If there was no unexpected error, but that the document has not
            been found, send the legitimate status code. `statement` is null.
        */
        res.sendStatus(404);
      } else {
        /*
            If everything went well, send an empty response with the correct
            HTTP status.
        */
        var option =  {
            key: actor
        };

        Statement.request('byActor', option, function(err, statements) {
            if(err) {
                /*
                    If an unexpected error occurs, forward it to Express error
                    middleware which will send the error properly formatted.
                */
                next(err);
            } else if(!statements) {
                /*
                    If there was no unexpected error, but that the document has not
                    been found, send the legitimate status code. `statement` is null.
                */
                res.sendStatus(404);
            }  else {
                /*
                    If everything went well, send an empty response with the correct
                    HTTP status.
                */
                res.status(200).json(statements);
            }
        });
      }
    });
});

/// List of all statements, for a given activity name
router.get('/statements/:activity_name', function(req, res, next) {

// could be changed to fit the view in request0j parameters
    var options =  {
        key: req.params.activity_name
    };
    Activity.request('byName', options, function(err, activity){
      if(err) {
        /*
            If an unexpected error occurs, forward it to Express error
            middleware which will send the error properly formatted.
        */
        next(err);
      } else if(!activity) {
        /*
            If there was no unexpected error, but that the document has not
            been found, send the legitimate status code. `statement` is null.
        */
        res.sendStatus(404);
      } else {
        /*
            If everything went well, send an empty response with the correct
            HTTP status.
        */
        var option =  {
            key: activity
        };

        Statement.request('byActivity', option, function(err, statements) {
            if(err) {
                /*
                    If an unexpected error occurs, forward it to Express error
                    middleware which will send the error properly formatted.
                */
                next(err);
            } else if(!statements) {
                /*
                    If there was no unexpected error, but that the document has not
                    been found, send the legitimate status code. `statement` is null.
                */
                res.sendStatus(404);
            }  else {
                /*
                    If everything went well, send an empty response with the correct
                    HTTP status.
                */
                res.status(200).json(statements);
            }
        });
      }
    });
});

/// List of all statements, for a given verb
router.get('/statements/:verb', function(req, res, next) {

// could be changed to fit the view in request0j parameters
    var options =  {
        key: req.params.verb
    };
    Verb.request('byDisplay', options, function(err, verb){
      if(err) {
        /*
            If an unexpected error occurs, forward it to Express error
            middleware which will send the error properly formatted.
        */
        next(err);
      } else if(!verb) {
        /*
            If there was no unexpected error, but that the document has not
            been found, send the legitimate status code. `statement` is null.
        */
        res.sendStatus(404);
      } else {
        /*
            If everything went well, send an empty response with the correct
            HTTP status.
        */
        var option =  {
            key: verb
        };

        Statement.request('byVerb', option, function(err, statements) {
            if(err) {
                /*
                    If an unexpected error occurs, forward it to Express error
                    middleware which will send the error properly formatted.
                */
                next(err);
            } else if(!statements) {
                /*
                    If there was no unexpected error, but that the document has not
                    been found, send the legitimate status code. `statement` is null.
                */
                res.sendStatus(404);
            }  else {
                /*
                    If everything went well, send an empty response with the correct
                    HTTP status.
                */
                res.status(200).json(statements);
            }
        });
      }
    });
});
/*
/// List of all statements, for a given attribute !
router.get('/statements', function(req, res, next) {

// could be changed to fit the view in request0j parameters
    var options =  {
        key: 'Joseph'
    };

    Statement.request('byActor', options, function(err, statements) {
        if(err) {
            
            //    If an unexpected error occurs, forward it to Express error
            //   middleware which will send the error properly formatted.
            
            next(err);
        } else {
            
            //    If everything went well, send an empty response with the correct
            //    HTTP status.
            
            res.status(200).json(statements);
        }
    });
});*/
// Export the router instance to make it available from other files.
module.exports = router;
