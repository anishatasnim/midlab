var db = require('./db');

module.exports= {
	getById : function(eid, callback){
		var sql = "select * from employee where eid=?";
		db.getResults(sql, [eid], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from employeee";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validate: function(employee, callback){
		var sql ="SELECT * FROM employee where uname=? and password=? ";
		db.getResults(sql, [employee.uname, employee.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	validateAdmin: function(admin, callback){
		var sql ="SELECT * FROM admin where uname=? and password=? ";
		db.getResults(sql, [admin.uname, admin.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from employee where uname=?";
		db.getResults(sql, [uname], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(employee, callback){
		var sql = "insert into employee values(?,?,?,?)";
		db.execute(sql, [null, employee.ename,employee.cname,employee.cno, employee.password, employee.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(employee, callback){
		var sql = "update employee set ename=?, cname=?, cno=?, uname=?, password=?, where eid=?";
		db.execute(sql, [employee.ename,employee.cname,employee.cno,employee.uname, employee.password, employee.eid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(employee, callback){
		var sql = "delete from employee where eid=?";
		db.execute(sql, [employee.eid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}