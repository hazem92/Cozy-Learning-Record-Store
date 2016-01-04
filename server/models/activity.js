// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
// This definition could be exte,ded to add more attributes..
var Activity = cozydb.getModel('Activity', {

	id: String		//IRI	
	name: [{key:"langTag", value:"value"}],
	description: [{key:"langTag", value:"value"}],
	type: String,		//IRI
	moreInfo: String, 	//IRI


});

// export module 
module.exports = Activity;
