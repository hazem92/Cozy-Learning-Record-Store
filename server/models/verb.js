// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
var Verb = cozydb.getModel('Verb', {

	// http://xapi.vocab.pub/datasets/adl/verbs/
	"display": {
        default: '',
        type: String
    },				//human readable representation of the Verb in one or more languages
});

// export module
module.exports = Verb;
