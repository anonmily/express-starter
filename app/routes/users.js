module.exports= function(db){
	var express 	= require('express'),
		router 		= express.Router(),
		
		models 		= require('../models')(db),
		Users 		= models.users,
		Session		= models.session,

		async 		= require('async'),
		utils 		= require('../utils')(db),
		is			= require('simply-is'),
		to 			= utils.tools.to(),
		response	= utils.response;

	router.get('/', function(req, res, next) {
		var token = req.headers['x-auth']; // for some reason, has to be lower case
		if(token){
			Session.check(token, function(err,result){
				if(result){
					res.status(200).json(result);
				}else{
					res.status(401).json(response.invalid);
				}
				if(err){
					res.status(401).json(response.error);
				}
			});
		}else{
			res.status(401).json(response.error);
		}
		
	});

	router.post('/login', function(req, res, next) {
		Users.login(req.body,function(err,result){
			if(result.status){
				res.status(200).json(result);
			}else{
				res.status(401).json(result);
			}
		});
	});

	router.post('/',function(req,res, next){
		Users.create(req.body,function(err,result){
			if(result.status){
				res.status(201).json(result);
			}else{
				res.status(401).json(result);
			}
		});
	});

	return router;

};