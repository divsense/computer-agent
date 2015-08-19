'use strict';

var argv = require('minimist')(process.argv.slice(2));
var Datastore = require("nedb");

var dbpath = argv.path;

if( !dbpath ){

	process.stderr.write("Path parameter required");
	process.exit(9);

}

process.stdin.setEncoding('utf8');

var data = "";

process.stdin.on("readable", function(){
	var chunk = process.stdin.read();
	if( chunk ){
		data += chunk;
	}
});

process.stdin.on("end", function(){

	var json_data;

	if( !data ){
		process.stderr.write("Empty data");
		process.exit(9);
	}

	try{
		json_data = JSON.parse( data );
	}
	catch(e){
		process.stderr.write("Invalid JSON data");
		process.exit(9);
	}

	if( !Array.isArray( json_data ) ){
		process.stderr.write("Array expected");
		process.exit(9);
	}

	var db = new Datastore({filename: dbpath});

	db.loadDatabase(function(err){

		if( err ){
			process.stderr.write(JSON.stringify(err));
			process.exit(9);
		}

		json_data.forEach(function(rec){

			if( !rec._id ){
				process.stderr.write("Record: no ID");
				process.exit(9);
			}

			db.update({_id: rec._id}, rec, {upsert:true}, function(err){
				if( err ){
					process.stderr.write(JSON.stringify(err));
					process.exit(9);
				}
			});
		});
	});
});
