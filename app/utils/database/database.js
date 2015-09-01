module.exports = function(db){
	var async 	= 	require('async'),
		_		=	require('lodash'),
		utils 	= 	require('../tools'),
		qutil =	require('./querybuilder')(db);

	return {
		select: function(queryobj,callback){
			var q = _.clone(queryobj);
			if(q.override){
				var overridden = qutil.set.override(q.override, q.criteria, q.select);
				q.select = overridden.select;
				q.criteria = overridden.criteria;
			}

			var limit = "";
			if(q.criteria && q.criteria.limit){ 
				limit = qutil.set.limit(q.criteria.limit); 
				delete q.criteria.limit;
			}else if(q.limit){
				limit = qutil.set.limit(q.limit);
			}

			var select 	= qutil.set.select(q.select),
				from	= "FROM " + q.from + " ",
				where	= qutil.set.where(q.criteria),
				join	= qutil.set.join(q.join),
				groupby = qutil.set.groupby(q.groupby),
				database = q.database ? q.database : "velox";

			query = select + from + join + where + groupby + limit;
			qutil.run(database, query, callback);
		},
		update: function(queryobj,callback){
			var values = [];
			var fields = queryobj.fields;
			var database = queryobj.database ? queryobj.database: "velox";

			_.forIn(fields,function(value,column){
				// for functions (e.g. UTC_DATETIME()) don't put quotes
				if(String(value).indexOf('()') >= 0){
					values.push(qutil.escapeId(column) + "=" + value);
				}else{
					values.push(qutil.escapeId(column) + '=\"' + qutil.escapeValue(value)+'\"');
				}
			});
			var query = "UPDATE " + queryobj.table + " SET ";
			query += values.join(',') + " ";
			if(queryobj.criteria){
				query += qutil.set.where(queryobj.criteria);
			}
			qutil.run(database, query, callback);
		},
		insert: function(queryobj,callback){
			var database = queryobj.database ? queryobj.database: "velox";
			var values = [];
			var fields = queryobj.fields;

			_.forIn(fields, function(value,column){
				// for functions (e.g. UTC_DATETIME()) don't put quotes
				if(String(value).indexOf('()') >= 0){
					values.push(qutil.escapeId(column) + "=" + value);
				}else{
					values.push(qutil.escapeId(column) + '=\"' + qutil.escapeValue(value)+'\"');
				}
			});

			var query = "INSERT INTO " + queryobj.table + " SET ";
			query += values.join(',');
			qutil.run(database, query, callback);
		},
		delete: function(queryobj,callback){
			var database = queryobj.database ? queryobj.database: "velox";
			var query = "DELETE FROM " + queryobj.table + " ";
			query += qutil.set.where(queryobj.criteria);
			qutil.run(database, query, callback);
		},
		truncate: function(queryobj, callback){
			var database = queryobj.database ? queryobj.database: "velox";
			qutil.run(database, "TRUNCATE " + queryobj.table, callback);
		}
	};
};