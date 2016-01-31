var express = require('express');
var router = express.Router();
var Statement = require('../models/statement');
var Actor = require('../models/actor');
var Activity = require('../models/activity');
var Verb = require('../models/verb');

var actor_object;
var activity_object;
var verb_object;

// Create a new statement
router.post('/statements', function(req, res, next) {
  findOrCreateActor(req, res, next);
});

function findOrCreateActor(req, res, next) {
  var actor_name = req.body.actor.name;
  if(actor_name) {
    var options =  {
      key: actor_name
    };
    Actor.request('byName', options, function(err, actor){

      if(err) {

        next(err);
      } else if(!actor || actor.length == 0) {

        Actor.create(req.body.actor, function(err, actor) {
          if(err) {

            next(err);
          } else {

            actor_object = actor;
            console.log(actor);
          }
        });
      } else {
        actor_object = actor[0];
        console.log(actor);
      }

      if(actor_object) {
        findOrCreateActivity(req, res, next);
      } else {
        next(err);
      }
    });
  }
}

function findOrCreateActivity(req, res, next) {
  var activity_name = req.body.activity.name;
  if(activity_name) {
    var options =  {
      key: activity_name
    };
    Activity.request('byName', options, function(err, activity){
      if(err) {

        next(err);
      } else if(!activity || activity.length == 0) {

        Activity.create(req.body.activity, function(err, activity) {
          if(err) {

            next(err);
          } else {
            activity_object = activity;
            console.log(activity);
          }
        });
      } else {
        activity_object = activity[0];
        console.log(activity_object);
      }

      if (activity_object) {
        findOrCreateVerb(req, res, next);
      } else {
        next(err);
      }
    });
  }
}

function findOrCreateVerb(req, res, next) {
  var verb_display = req.body.verb.display;
  if(verb_display) {
    var options =  {
      key: verb_display
    };
    Verb.request('byDisplay', options, function(err, verb){
      if(err) {

        next(err);
      } else if(!verb || verb.length == 0) {

        Verb.create(req.body.verb, function(err, verb) {
          if(err) {

            next(err);
          } else {
            verb_object = verb;
            console.log(verb);
          }
        });
      } else {

        verb_object = verb[0];
        console.log(verb_object);
      }

      if(verb_object) {
        createStatement(req, res, next);
      } else {
        next(err);
      }
    });
  }
}

function createStatement(req, res, next) {
  console.log(actor_object);
  console.log(verb_object);
  console.log(activity_object);
  Statement.create({"actor": actor_object, "verb": verb_object, "activity": activity_object}, function(err, statement) {
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
}


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

// Remove all existing statements
router.delete('/statements', function(req, res, next) {

  Statement.requestDestroy('all', function(err) {
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
  // Find statements by actor name
  if(req.query.actor_name) {
    console.log(req.query.actor_name);
    var options =  {
      key: req.query.actor_name
    };
    console.log(options);
    Actor.request('byName', options, function(err, actor){
      if(err) {

        next(err);
      } else if(!actor || actor.length == 0) {
        console.log(actor);
        res.sendStatus(404);
      } else {

        var option =  {
          key: actor[0]
        };
        console.log(option);
        Statement.request('byActor', option, function(err, statements) {
          if(err) {

            next(err);
          } else if(!statements || statements.length == 0) {

            res.sendStatus(404);
          }  else {

            res.status(200).json(statements);
          }
        });
      }
    });
  }

  // Find statements by activity name
  else if(req.query.activity_name) {
    var options =  {
      key: req.query.activity_name
    };
    Activity.request('byName', options, function(err, activity){
      if(err) {

        next(err);
      } else if(!activity || activity.length == 0) {

        res.sendStatus(404);
      } else {

        var option =  {
          key: activity[0]
        };

        Statement.request('byActivity', option, function(err, statements) {
          if(err) {

            next(err);
          } else if(!statements || statements.length == 0) {

            res.sendStatus(404);
          }  else {

            res.status(200).json(statements);
          }
        });
      }
    });
  }

  // Find statements by verb
  else if(req.query.verb_display) {
    var options =  {
      key: req.query.verb_display
    };
    Verb.request('byDisplay', options, function(err, verb){
      if(err) {

        next(err);
      } else if(!verb || verb.length == 0) {

        res.sendStatus(404);
      } else {

        var option =  {
          key: verb[0]
        };
        console.log(verb[0]);
        Statement.request('byVerb', option, function(err, statements) {
          if(err) {

            next(err);
          } else if(!statements || statements.length == 0) {

            res.sendStatus(404);
          }  else {

            res.status(200).json(statements);
          }
        });
      }
    });
  }
  // Find all statements
  else {
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
  }

});

// Export the router instance to make it available from other files.
module.exports = router;
