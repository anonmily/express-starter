var is = require('simply-is');

module.exports = function(x){
	var TO = {
		object : function(x)	{ 	
			if(	is.array(x) ){
				var newobj = {};
				x.forEach(function(curr,index){
					newobj[index] = curr;
				});
				return newobj;
			}
			if( is.json(x) ){ return JSON.parse(x);	}
			if(	is.number(x) || is.string(x) || is.boolean(x) || is.null(x) || is.undefined ){	return {key: x}; }
			if( is.object(x) ){ return x; }
		},
		array : 	function(x, type){
			if( is.object(x) ){ return objectToArray(x, type); }
			if( is.array(x) ){ return x; }
			if( is.json(x)	){
				var convert = JSON.parse(x);
				if( is.object(convert)	){ return objectToArray(x, type); }
				if( is.array(convert)	){ return convert; }
			}
			if( is.string(x) || is.number ){ return [x]; }

			function objectToArray(x, type){
				if( type==="keys" || !type ){ return Object.keys(x); }
				if( type==="value" ){
					var arr = [];
					for(var key in x){
						arr.push( x[key]);
					}
					return arr;
				}
			}
		},
		string : function(x)	{
			if( is.object(x) )	{	log(JSON.stringify(x)); return JSON.stringify(x); 	}
			if( is.array(x) )	{ 	log(x.join(',')); return x.join(','); 				}
			if( is.number(x) )	{ 	log(String(x)); return String(x); 					}
			return String(x);
		},
		number : function(x)	{ 	return x.constructor === Number; 					}
	};
	
	if(!x){ return TO; }
	else{
		x.to = {
			object: TO.object(x),
			array: TO.array(x),
			string: TO.string(x),
			number: TO.number(x)
		};
	}

};