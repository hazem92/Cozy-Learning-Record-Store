var express = require('express');
var router = express.Router();
var Statement = require('../models/statement');
var Actor = require('../models/actor');
var Activity = require('../models/activity');
var Verb = require('../models/verb');

// Create a new statement
router.post('/statements', function(req, res, next) {
  console.log(req.body.actor);
  var actor_name = req.body.actor.name;
  var activity_name = req.body.activity.name;
  var verb_display = req.body.verb.display;
  console.log(req.body.actor.name);
  console.log(req.body.activity.name);
  console.log(req.body.verb.display);
  var actor_object;
  var activity_object;
  var verb_object;

  if(actor_name) {
    var options =  {
      key: actor_name
    };
    Actor.request('byName', options, function(err, actor){
      if(err) {

        next(err);
      } else if(!actor) {

        return null;
      } else {

        actor_object = actor[0];
        console.log(actor_object);

        if(activity_name) {
          var options =  {
            key: activity_name
          };
          Activity.request('byName', options, function(err, activity){
            if(err) {

              next(err);
            } else if(!activity) {

              return null;
            } else {

              activity_object = activity[0];
              console.log(activity_object);

              if(verb_display) {
                var options =  {
                  key: verb_display
                };
                Verb.request('byDisplay', options, function(err, verb){
                  if(err) {

                    next(err);
                  } else if(!verb) {

                    return null;
                  } else {

                    verb_object = verb[0];
                    console.log(verb_object);


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
                });
              }


            }
          });
        }

      }
    });
  }




  console.log(actor_object);
  console.log(activity_object);
  console.log(verb_object);


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
      } else if(!actor) {

        Actor.create(req.body.actor, function(err, actor) {
          if(err) {

            next(err);
          } else {

            actor_object = actor;
          }
        });
      } else {

        actor_object = actor[0];
        console.log(actor_object);
      }

      if(actor_object) {
        findOrCreateActivity(req, res, next);
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
      } else if(!activity) {

        Activity.create(req.body.activity, function(err, activity) {
          if(err) {

            next(err);
          } else {

            activity_object = activity;
          }
        });
      } else {

        activity_object = activity[0];
        console.log(activity_object);
      }
    });
  }
}

function findOrCreateVerb(req, res, next) {

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
