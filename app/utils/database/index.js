module.exports = function(db){
	var database = require('./database')(db);
	database.get = database.select;
	database.edit = database.update;
	database.query = require('./querybuilder')(db);
	return database;
};