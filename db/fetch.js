'use strict';

var argv = require('minimist')(process.argv.slice(2));
var Datastore = require("nedb");

var dbpath = argv.path;

if( !dbpath ){

	process.stderr.write("Path parameter required");
	process.exit(9);

}

var db = new Datastore({filename: dbpath});

db.loadDatabase(function(err){

	if( err ){
		process.stderr.write(JSON.stringify(err));
		process.exit(9);
	}

	db.find({}, function(err, doc){
		if( err ){
			process.stderr.write(JSON.stringify(err));
			process.exit(9);
		}

		process.stdout.write( JSON.stringify( doc ) );
	});
});
