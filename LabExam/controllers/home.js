var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['uname'], function(result){
		res.render('home/index', {employee: result});
	});
});

router.get('/addemployee', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/addemployee', {employeelist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/updateemployee/:eid', function(req, res){
	userModel.getById(req.params.eid, function(result){
		res.render('home/updateemployee', {employee: result});
	});
});

router.post('/updateemployee/:eid', function(req, res){
	
		var employee = {
			eid: req.params.eid,
			ename: req.body.ename,
			cname: req.body.cname,
			cno: req.body.cno,
			uname: req.body.uname,
			password: req.body.password,
		};

		userModel.update(employee, function(status){
			if(status){
				res.redirect('/home');
			}else{
				res.redirect('/home/updateemployee/'+req.params.eid);
			}
		});
});

module.exports = router;