var express = require('express');
var router = express.Router();
var Actor = require('../models/actor');

// Create a new Actor
router.post('/actors', function(req, res, next) {
  var actor_name = req.body.name;
  findOrCreateActor(req, res, next, actor_name, function (status, message) {
    res.status(status).send(message);
  });
});

function findOrCreateActor(req, res, next, actor_name, callback) {

  if(actor_name) {
    var options =  {
      key: actor_name
    };
    Actor.request('byName', options, function(err, actor){

      if(err) {

        next(err);
      } else if(!actor || actor.length == 0) {

        Actor.create(req.body, function(err, actor) {
          if(err) {

            next(err);
          } else {
            callback(201, actor);
          }
        });
      } else {
        callback(201, actor[0]);
      }
    });
  } else {
    callback(400, 'Actor name cannot be empty');
  }
}


// Fetch an existing actor by id
router.get('/actors/:id', function(req, res, next) {

  if(req.params.id) {

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
  }

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

// Remove all existing actors
router.delete('/actors', function(req, res, next) {

  Actor.requestDestroy('all', function(err) {
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


/// List of all actors
router.get('/actors', function(req, res, next) {

  /// Find actors by name
  if(req.query.name) {
    var options =  {
      key: req.query.name
    };

    Actor.request('byName', options, function(err, actor) {
      if(err) {

        //    If an unexpected error occurs, forward it to Express error
        //    middleware which will send the error properly formatted.

        next(err);
      } else if(!actor) {
        /*
        If there was no unexpected error, but that the document has not
        been found, send the legitimate status code. `actor` is null.
        */
        res.sendStatus(404);
      } else {

        //    If everything went well, send an empty response with the correct
        //    HTTP status.

        res.status(200).json(actor);
      }
    });
  }
  // Find actors by mbox
  else if(req.query.mbox) {
    var options =  {
      key: req.query.mbox
    };

    Actor.request('byMbox', options, function(err, actor) {
      if(err) {

        //    If an unexpected error occurs, forward it to Express error
        //    middleware which will send the error properly formatted.

        next(err);
      } else if(!actor) {
        /*
        If there was no unexpected error, but that the document has not
        been found, send the legitimate status code. `actor` is null.
        */
        res.sendStatus(404);
      } else {

        //    If everything went well, send an empty response with the correct
        //    HTTP status.

        res.status(200).json(actor);
      }
    });
  }
  // Find all actors
  else {
    console.log('get all');
    console.log(req.params);
    Actor.request('all', function(err, actors) {
      if(err) {

        //    If an unexpected error occurs, forward it to Express error
        //    middleware which will send the error properly formatted.

        next(err);
      } else {

        //    If everything went well, send an empty response with the correct
        //    HTTP status.

        res.status(200).json(actors);
      }
    });
  }

});

// Export the router instance to make it available from other files.
module.exports = router;
