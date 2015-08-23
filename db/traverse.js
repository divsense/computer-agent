function adda_to_offdom( params ){

	var array = params.data;
	var dir = params.relation;

	var root = find(function(n){ return (n.id === "__root__") }, array );
	var root_ids = root.c[0][1];

	var ids = reduce(function(m,a){
		if( a.id !== "__root__" ) m[ a.id ] = spec_helper.gen_id();
		return m;
	},{},array);

	var branch = reduce(function(m,a){

		if( a.id !== "__root__" ){

			var targ = m[ ids[ a.id ] ] = {};

			if( a.t ) targ.t  = a.t;
			if( a.u ) targ.u  = a.u;
			if( a.k ) targ.k  = a.k;

			if( a.c ){

				a.c = map(function(cc){
					cc[1] = map(function(ii){ return ids[ ii ] }, cc[1]);
					return cc;
				}, a.c );

				if( dir === "leftchild") targ.b = a.c || [];
				else targ.a = a.c || [];

			}
		}
		return m;

	}, {}, array);

	this.value = [ map(function(n){ return ids[n] }, root_ids), branch ];

	return this;

}

module.exports = function(data, cb){




}

