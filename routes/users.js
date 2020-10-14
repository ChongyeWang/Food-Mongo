var express = require('express');
var router = express.Router();

/* GET users listing. */
const User = require(".././models/user.js");

router.get('/', function(req, res, next) {

	User.find({}, function(err, users) {
		console.log(users);
		res.send(JSON.stringify({ x: 5, y: 6 }));
		
	});


});

router.post('/register', function(req, res, next) {

	console.log(req.body);

	User.find({}, function(err, users) {
		var username = req.body.username;
		users = users.filter(user => user["username"] === username);
		if(users.length !== 0) {
			res.status(409).send("Conflict");
		}
		else {
			if (err) {
				res.status(404).send("Not found");
			}
			else {
				const user = new User(
				{
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
				});

	    		user.save();
	    		res.send({message: "ok", data: user});
			}
	    }
		
	});


});


module.exports = router;
