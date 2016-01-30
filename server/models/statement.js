// Definition of the document type and basic operations on Statements.
var cozydb = require('cozydb');

// Make this model available from other files.
// Some attributes are optionnal and may be removed later (x-API Spec)
// Only id, actor, verb, object are required
var Statement = cozydb.getModel('Statement', {

	//id: String,			//UUID
	"actor":   {
        default: null,
        type: Object
    },			//Agent or Group

	"verb":   {
        default: null,
        type: Object
    },				//Action take

// we are going at this stage to reduce the object attribute to Activity definition since its definition in the spec is a bit ambiguous
//	object: Object,		//Activity,Agent ..

  "activity":   {
        default: null,
        type: Object
    },	    		//Activity done

/*
	result: Object,			//Further details about the specified verb
	context: Object,		//Context that gives the Statement more meaning
	timestamp: Date,		//Timestamp (Formatted according to ISO 8601) of when the events described within this Statement occurred
	stored: Date,			//Timestamp (Formatted according to ISO 8601) of when this Statement was recorded
	authority: Object,		//Agent or Group who is asserting this Statement is true
	attachements: [Object],		//Headers for attachments to the Statement
*/

});

// export module
module.exports = Statement;
