var config = require('../../config/config.js');

module.exports = {
	log: 	require('./log')(config),
	to: 	require('./to')
};