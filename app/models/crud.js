module.exports = function(db, schema, defaults){

	var utils = require('../utils')(db),
		is = require('simply-is'),
		_ = require('lodash'),
		database = utils.db;

	this.schema = schema;
	if(defaults){
		this.defaults = defaults;
	}else{
		this.defaults = {
			create: {},
			read: {},
			update: {
				edit: {},
				criteria: {}
			},
			delete: {}
		};
	}
	
	this.create = function(obj,callback){
		obj = _.merge(obj, this.defaults.insert);
		database.insert({
			fields: obj,
			table: this.schema.from,
			database: this.schema.database
		}, callback);
	};

	this.read = function(filters, limit, callback){
		filters = _.merge(filters, this.defaults.read);
		this.schema.criteria = is.empty(filters) ? {} : filters;
		this.schema.limit = limit;
		database.get(schema,callback);
	};

	this.update = function(obj,callback){
		obj.edit = _.merge(obj.edit, this.defaults.update.edit);
		obj.criteria = _.merge(obj.criteria, this.defaults.update.criteria);
		var that = this;
		database.edit({
			fields: obj.edit,
			table: that.schema.from,
			database: that.schema.database,
			criteria: obj.criteria
		}, function(err,status){
			if(!err && status){
				that.read(obj.criteria,1,function(err,result){
					callback(err,{
						success: true,
						status: status,
						result: result[0]
					});
				});
			}else{
				callback(err,{
					success: false,
					message: 'update failed'
				});
			}
		});
	};

	this.delete = function(obj,callback){
		obj = _.merge(obj, this.defaults.delete);
		database.delete({
			table: this.schema.from,
			database: this.schema.database,
			criteria: obj
		},callback);
	};

	this.setCreateDefaults = function(obj){
		this.defaults.insert = obj;
	};
	this.setReadDefaults = function(obj){
		this.defaults.read = obj;
	};
	this.setUpdateDefaults= function(obj){
		this.defaults.update = obj;
	};
	this.setDeleteDefaults = function(obj){
		this.defaults.delete = obj;
	};


};