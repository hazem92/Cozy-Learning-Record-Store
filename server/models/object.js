// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
// For simplification we reduced for the moment Actor to one Agent but it can be extended to Group by adding member attribute which is an array of Agent Objects
var Objet = cozydb.getModel('Object', {

	//"Agent" or "Activity"
	"objectType":  {
    default: '',
		type: String
	},

  "data": {
    default: null,
		type: Object
  }

});


// export module
module.exports = Objet;
