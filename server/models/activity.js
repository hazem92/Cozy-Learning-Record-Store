// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
// This definition could be exte,ded to add more attributes..
var Activity = cozydb.getModel('Activity', {

  "name":  {
        default: '',
        type: String
    },
  "type":  {
        default: '',
        type: String
    },
	"moreInfo":  {
        default: '',
        type: String
    },
	"description":  {
        default: '',
        type: String
    },

});

// export module
module.exports = Activity;
