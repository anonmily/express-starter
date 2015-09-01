var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vxdealer',function(){
	console.log('mongodb connected!');
});
module.exports = mongoose;
