// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
// For simplification we reduced for the moment Actor to one Agent but it can be extended to Group by adding member attribute which is an array of Agent Objects
var Actor = cozydb.getModel('Actor', {

	//"Agent"
	"objectType":  {
        default: '',
        type: String
    },

	//Full name of the Agent
	"name":  {
        default: '',
        type: String
    },
		
	//The required format is "mailto:email address", it is one of Inverse Functional Identifiers
	"mbox":  {
        default: '',
        type: String
    },

	//"member": [Object],		//Used when the actor is a group

});

// export module
module.exports = Actor;
