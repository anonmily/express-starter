var mongoose = require('mongoose'),
	config = require('./config');

//mongodb://<dbuser>:<dbpassword>@ds031852.mongolab.com:31852/sandbox
var mongourl = 'mongodb://'+config.DB_USERNAME+':'+ config.DB_PASSWORD + '@' + config.DB_HOST + ':' + config.DB_PORT + '/' + config.DB_DATABASE;
console.log(mongourl);

mongoose.connect(mongourl ,function(){
	console.log('mongodb connected!');
});

module.exports = mongoose;