module.exports= function(db){
	return {
		tools	: require('./tools'),
		db 		: require('./database')(db),
		handle	: require('./handle'),
		response: require('./response')
	};
};