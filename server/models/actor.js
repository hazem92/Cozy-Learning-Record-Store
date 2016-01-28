// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
// For simplification we reduced for the moment Actor to one Agent but it can be extended to Group by adding member attribute which is an array of Agent Objects
var Actor = cozydb.getModel('Actor', {

	objectType: String,		//"Agent"
	name: String,			//Full name of the Agent
	mbox: String,			//The required format is "mailto:email address", it is one of Inverse Functional Identifiers
	member: [Object]		//Used when the actor is a group

});

// export module
module.exports = Actor;
