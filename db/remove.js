'use strict';

var argv = require('minimist')(process.argv.slice(2));
var Datastore = require("nedb");

var dbpath = argv.path;
var nodeid = argv.node;

if( !dbpath ){

	process.stderr.write("Path parameter required");
	process.exit(9);

}

if( !nodeid ){

	process.stderr.write("Node parameter required");
	process.exit(9);

}


var db = new Datastore({filename: dbpath});

db.loadDatabase(function(err){

	if( err ){
		process.stderr.write(JSON.stringify(err));
		process.exit(9);
	}

	db.remove({_id: nodeid}, {}, function(err){
		if( err ){
			process.stderr.write(JSON.stringify(err));
			process.exit(9);
		}
	});
});
