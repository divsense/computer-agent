'use strict';

var argv = require("minimist")(process.argv.slice(2));
var fs = require("fs");
var nsf = require("nsf");
var Datastore = require("nedb");

var dbpath = argv.path;
var output = argv.output;
var input = argv.input;

if( !dbpath ){

	process.stderr.write("Path parameter required");
	process.exit(9);

}

if( !output ){

	process.stderr.write("Output parameter required");
	process.exit(9);

}

if( !input ){

	process.stderr.write("Input parameter required");
	process.exit(9);

}

var db = new Datastore({filename: dbpath});

db.loadDatabase(function(err){

	var memo = ;
	var acc = [];

	if( err ){
		process.stderr.write(JSON.stringify(err));
		process.exit(9);
	}

	db.find({}, function(err, doc){
		if( err ){
			process.stderr.write(JSON.stringify(err));
			process.exit(9);
		}

		var options = {
			order: nsf.DEPTH_FIRST,
			take: { u: { type: { folder: 1, doc: 1 } } } 
		};

		nsf.traverse( doc, options, function(err, node, level){

			if( level <= memo ){
				acc = acc.slice(0, (acc.length - memo - level - 1));
			}

			memo = level;

			acc.push(node.t);

			if( nsf.has( "type", "folder", node.u ) ){
				var path = [output].concat(acc).join("/");
				fs.mkdirSync( path );
			}
			else{
				var dest = [ __dirname, output ].concat(acc).join("/") + ".txt";
				var src = [ __dirname, input, node._id, "out.txt" ].join("/");
				fs.open( src, function( err, fd ){

					if( err ){
//                        process.exit(9);
						console.log("File does not exists: " + src);
					}
					else{
						fs.symlinkSync( src, dest );
					}
				});
			}
		});
	});
});

