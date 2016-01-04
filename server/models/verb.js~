// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
var Verb = cozydb.getModel('Verb', {

	id:String					//IRI that corresponds to a Verb definition, we are using the definied list of adl
							// http://xapi.vocab.pub/datasets/adl/verbs/
	display:[{key:"langTag", value:"value"}],	//human readable representation of the Verb in one or more languages

});

// export module 
module.exports = Verb;
