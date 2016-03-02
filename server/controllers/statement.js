var express = require('express');
var router = express.Router();
var Statement = require('../models/statement');
var Actor = require('../models/actor');
var Activity = require('../models/activity');
var Verb = require('../models/verb');
var Objet = require('../models/object');

var actor_object;
var verb_object;
var activity_object;
var actor_object_2;
var object_object;

// Create a new statement
router.post('/statements', function(req, res, next) {
  console.log(req.body);
  var actor_name = req.body.actor.name;
  var verb_display = req.body.verb.display;
  var objectType = req.body.object.objectType;

  if (objectType == "actor") {
    var actor_name_object = req.body.object.data.name
    console.log("------------------------");
    console.log(actor_name_object);
    findOrCreateActor(req, res, next, actor_name, function(req, res, next) {
      console.log("------------------------");
      console.log(actor_object);
      findOrCreateObjectActor(req, res, next, actor_name_object, function (req, res, next) {
        console.log("------------------------");
        console.log(actor_object_2);
        createObject(req, res, next, objectType, actor_object_2, function (req, res, next) {
          console.log("------------------------");
          console.log(object_object);
          findOrCreateVerb(req, res, next, verb_display, function (req, res, next) {
            console.log("------------------------");
            console.log(verb_object);
            createStatement(req, res, next);
          });
        });
      });
    });
  } else if (objectType == "activity") {
    var activity_name = req.body.object.data.name;
    console.log(activity_name);
    findOrCreateActor(req, res, next, actor_name, function(req, res, next) {
      findOrCreateActivity(req, res, next, activity_name, function (req, res, next) {
        createObject(req, res, next, objectType, activity_object, function (req, res, next) {
          findOrCreateVerb(req, res, next, verb_display, function (req, res, next) {
            createStatement(req, res, next);
          });
        })
      });
    });
  } else {
    res.status(400).send('Object type invalid');
  }

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

        Actor.create(req.body.actor, function(err, actor) {
          if(err) {

            next(err);
          } else {
            actor_object = actor;
            callback(req, res, next);
          }
        });
      } else {
        actor_object = actor[0];
        callback(req, res, next);
      }
    });
  } else {
    res.status(400).send('Actor name cannot be empty');
  }
}

function findOrCreateObjectActor(req, res, next, actor_name, callback) {
  console.log("------------------------");
  console.log(actor_name);
  if(actor_name) {
    var options =  {
      key: actor_name
    };
    Actor.request('byName', options, function(err, actor){

      if(err) {

        next(err);
      } else if(!actor || actor.length == 0) {

        Actor.create(req.body.object.data, function(err, actor) {
          if(err) {

            next(err);
          } else {
                console.log("-----------actor object 1-------------");
                console.log(actor);
            actor_object_2 = actor;
            callback(req, res, next);
          }
        });
      } else {
        console.log("-----------actor object 2-------------");
        console.log(actor[0]);
        actor_object_2 = actor[0];
        callback(req, res, next);
      }
    });
  } else {
    res.status(400).send('Actor name cannot be empty');
  }
}


function findOrCreateActivity(req, res, next, activity_name, callback) {

  if(activity_name) {
    var options =  {
      key: activity_name
    };
    Activity.request('byName', options, function(err, activity){
      if(err) {

        next(err);
      } else if(!activity || activity.length == 0) {

        Activity.create(req.body.object.data, function(err, activity) {
          if(err) {

            next(err);
          } else {
            activity_object = activity;
            callback(req, res, next);
          }
        });
      } else {
        activity_object = activity[0];
        callback(req, res, next);
      }
    });
  } else {
    res.status(400).send('Activity name cannot be empty');
  }
}

function findOrCreateVerb(req, res, next, verb_display, callback) {

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
            callback(req, res, next);
          }
        });
      } else {
        verb_object = verb[0];
        callback(req, res, next);
      }
    });
  } else {
    res.status(400).send('Verb display cannot be empty');
  }
}

function createObject(req, res, next, objectType, data, callback) {
  console.log("-----------create object-------------");
  console.log(data);
  console.log(objectType);
  Objet.create({"objectType": objectType, "data": data}, function(err, object) {
    if(err) {
      console.log(err);
      next(err);
    } else {
      console.log(object);
      object_object = object;
      callback(req, res, next);
    }
  });
}

function createStatement(req, res, next) {
  var timestamp = Date.now();
  Statement.create({"actor": actor_object, "verb": verb_object, "object": object_object, "timestamp": timestamp}, function(err, statement) {
    if(err) {

      next(err);
    } else {

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
    var options =  {
      key: req.query.actor_name
    };
    Actor.request('byName', options, function(err, actor){
      if(err) {

        next(err);
      } else if(!actor || actor.length == 0) {
        res.sendStatus(404);
      } else {

        var option =  {
          key: actor[0]
        };
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
