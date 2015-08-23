'use strict';

var argv = require("minimist")(process.argv.slice(2));
var fs = require("fs");
var nsf = require("nsf");

var p_src = argv.src;
var p_dest = argv.dest;

if( !p_src ){

	process.stderr.write("Source (src) parameter required");
	process.exit(9);

}

if( !p_dest ){

	process.stderr.write("Destination (dest) parameter required");
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

	var options = {
		order: nsf.DEPTH_FIRST,

		take: {
			u: { type: {folder: true, doc: true} }
		},
		pass: { type:{ text: true} }
	};

	var acc = [];
	var memo = 0;
	var target_path;

	nsf.traverse( json_data, options, function(err, node, level){

		var diff = memo - level;
		memo = level;

		while( diff-- >= 0 ){
			acc.pop();
		}

		acc.push( node.t );

		if( nsf.has( "type", "folder", node.u ) ){
			target_path = [ __dirname, p_dest].concat( acc ).join("/");
			fs.mkdirSync( target_path );
		}
		else{
			target_path  = [ __dirname, p_dest ].concat( acc ).join("/");
			var file_path = [ __dirname, p_src, node._id, "out" ].join("/");
			var fd = fs.openSync( file_path, "r" );
			if( typeof fd === "undefined" ){
				process.stderr.write("File does not exist: " + file_path);
				process.exit(9);
			}
			else{
				fs.symlinkSync( file_path, target_path );
			}
		}
	});

});

