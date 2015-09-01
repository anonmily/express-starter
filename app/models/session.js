var jwt = require('jsonwebtoken'),
	fs = require('fs'),
	//privatekey = fs.readFileSync('./app/config/jwtkey.pem'),
	publickey = fs.readFileSync('./app/config/jwtkey.pub');

var session = {};

session.new = function(payload, expires){
	if(!expires){ expires = 60*24*31; }
	return jwt.sign(payload, publickey, { 
		//algorithm: 'RS256',
		expiresInMinutes: expires
	});
};

session.check = function(token, callback){
	jwt.verify(token, publickey, function(err, decoded) {
		callback(err,decoded);
	});
};

session.decodeToken = session.check;

module.exports = session;