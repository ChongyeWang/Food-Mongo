var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const { secret } = require('.././config/secrets.js');
const { auth } = require(".././config/passport.js");
auth();


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


router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (user) {
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            console.log(1111);
            console.log(token);
            console.log(user);
            res.send({message: "ok", token: "JWT " + token});
            // res.status(200).end("JWT " + token);
        }
        else {
        	console.log(222);
            res.status(401).end("Invalid Credentials");
        }
    });
});


module.exports = router;
