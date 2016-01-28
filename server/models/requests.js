// this module use cozydb to declare views that will index document of document type statement, actor, verb and activity


var cozydb = require('cozydb');

module.exports = {

 statement: {
    all: cozydb.defaultRequests.all
	  byActor: cozydb.defaultRequests.by('actor')
    byActivity:cozydb.defaultRequests.by('activity')
    byVerb:cozydb.defaultRequests.by('verb')
 }

 actor: {
    all: cozydb.defaultRequests.all
	  byMbox: cozydb.defaultRequests.by('mbox')
 }

 verb: {
    all: cozydb.defaultRequests.all
    byId: cozydb.defaultRequests.by('id')
}

 activity: {
    all: cozydb.defaultRequests.all
    byId: cozydb.defaultRequests.by('id')
 }

};
