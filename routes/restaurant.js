var express = require('express');
var router = express.Router();
const multer = require("multer");

const jwt = require('jsonwebtoken');
const { secret } = require('../config/secrets.js');
const { auth } = require("../config/passport2.js");
auth();

const Restaurant = require("../models/restaurant.js");
const User = require(".././models/user.js");
const Message = require(".././models/message.js");

const upload = multer({
	storage: multer.diskStorage({
		destination: "./client/src/public/uploads/",
		filename: function(req, file, cb){
		   cb(null, "IMAGE-" + file.originalname);
		}
	 }),
	limits:{fileSize: 1000000},
 }).single("myImage");


router.get('/all', function(req, res, next) {

	Restaurant.find({}, function(err, users) {
		console.log(users);
		res.writeHead(200,{
			'Content-Type' : 'text/plain'
		});
		res.end(JSON.stringify(users));
		// res.status(200).send(JSON.stringify(users));
		
	});

});

router.post('/register', function(req, res, next) {
	console.log(req.body);
	Restaurant.find({}, function(err, users) {
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
				const user = new Restaurant(
				{
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					name: req.body.name,
					phone: req.body.phone,
					location: req.body.location,
					lat: req.body.lat,
					lon: req.body.lon,

				});

	    		user.save();
	    		res.send({message: "ok", data: user});
			}
	    }
	});
});


router.post('/login', (req, res) => {
    Restaurant.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (user) {
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            console.log(user._id);
            console.log(token);
            console.log(user);
            res.send({message: "ok", token: "JWT " + token});
            // res.status(200).end("JWT " + token);
        }
        else {
            res.status(401).end("Invalid Credentials");
        }
    });
});



router.get('/profile/:id', (req, res) => {
	var id = req.params.id;
    Restaurant.findById(id, (error, user) => {
        if (error) {
            res.status(500).end("Error Occured");
        }
        if (user) {
             var data = {
                'id': user.id,
                'name': user.name,
				'email': user.email,
				'phone': user.phone,
				'location': user.location,
				'dish': user.dish,
				'order': user.order,
				'review': user.review
            }
			res.send({message: "ok", data: data});
			console.log("Restaurant found");
        }
        else {
        	console.log("Not found");
            res.status(402).end("Not found");
        }
	});

});

router.post('/upload-picture', function(req,res){
	upload(req, res, (err) => {
	  console.log("Request ---", req.body);
	  console.log("Request file ---", req.file);
	  if(!err)
		 return res.send(200).end();
   });
});

router.post('/add_dish', (req, res) => {
	var id = req.body.id;
	console.log(id);
	var name = req.body.name;
	var price = req.body.price;
	var category = req.body.category;
    Restaurant.update(
		{ _id: id },
		{ 
			$push: 
			{ 
				dish: {"name": name, "category": category, "price": price}
				
			} 
		},

		function( err, result ) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				res.send({message: "ok"});
			}
		}
	) 

});


router.post('/edit', (req, res) => {
	var id = req.body.id;
	var name = req.body.name;
	var email = req.body.email;
	var phone = req.body.phone;
	var location = req.body.location;
    Restaurant.update(
		{ _id: id },
		{ 
			name: name,
			email: email,
			phone: phone,
			location: location
		},

		function( err, result ) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				res.send({message: "ok"});
			}
		}
	) 
});

router.post('/place_order', (req, res) => {
	
	var userId = req.body.userId;
	var restaurantId = req.body.restaurantId;
	var order = req.body.order;

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); 
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;
    Restaurant.update(
		{ _id: restaurantId },
		{ 
			$push: 
			{ 
				order: {"userId": userId, "content": order, "status": "Pending", "date": today}
				
			} 
		},
		function( err, result ) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				res.send({message: "ok"});
			}
		}
		
	) ;

});


router.post('/update_order', (req, res) => {
	var orderId = req.body.orderId;
	var restaurantId = req.body.restaurantId;

	console.log(orderId);
	console.log(restaurantId);

    Restaurant.update(
		{ _id: restaurantId, "order._id" : orderId},
		{$set : {"order.$.status" : "Delivered"}},

		function( err, result ) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				res.send({message: "ok"});
			}
		}
	) 
});

router.post('/search', function(req, res, next) {
	let keyword = req.body.keyword;
	let restaurantId = req.body.id;
	Restaurant.find(
		{ _id: restaurantId}, 
		function(err, result) {
			if ( err ) res.status(500).end("Error Occured");
			else {

				let orders = [];
				for (var i = 0; i < result[0].order.length; i++) {
					if (result[0].order[i].status.includes(keyword)) {
						orders.push(result[0].order[i])
					}
				}
				res.send(JSON.stringify(orders));
			}
		}
			
	)
});


router.post('/search-all', function(req, res, next) {
	let keyword = req.body.keyword;
	Restaurant.find({},
		function(err, result) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				let restaurant = [];
				for (var i = 0; i < result.length; i++) {
					if (result[i].name.includes(keyword)) {
						restaurant.push(result[i]);
						continue;
					}
					if (result[i].location.includes(keyword)) {
						restaurant.push(result[i]);
						continue;
					}
					for (var j = 0; j < result[i].dish.length; j++) {
						if (result[i].dish[j].name.includes(keyword)) {
							restaurant.push(result[i]);
							break;
						}
					}
				}
				res.send(JSON.stringify(restaurant));
			}
		}
			
	)
});


router.post('/add_review', (req, res) => {
	
	var restaurantId = req.body.restaurantId;
	var review = req.body.review;

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); 
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;

    Restaurant.update(
		{ _id: restaurantId },
		{ 
			$push: 
			{ 
				review: {"content": review, "date": today}
				
			} 
		},
		function( err, result ) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				res.send({message: "ok"});
			}
		}
	) ;
});

router.post('/message', (req, res) => {
	
	var restaurantId = req.body.restaurantId;
	var userId = req.body.userId;
	var content = req.body.message;

	var today = new Date();
	// var dd = String(today.getDate()).padStart(2, '0');
	// var mm = String(today.getMonth() + 1).padStart(2, '0'); 
	// var yyyy = today.getFullYear();
	// var hours = today.getHours();
	// var min = today.getMinutes(); 
	// var sec = today.getSeconds();

	var time = today.toLocaleString();

	const message = new Message(
	{
		userId: userId,
		restaurantId: restaurantId,
		content: content,
		date: time

	});

	message.save();
	res.send({message: "ok"});
});



router.post('/getMessage', (req, res) => {
	var restaurantId = req.body.restaurantId;
	var userId = req.body.userId;
	Message.find(
		{ 
			$and: 
			[
				{userId: userId},
				{restaurantId: restaurantId}
			]
		}, 
		function(err, result) {
			if ( err ) res.status(500).end("Error Occured");
			else {
				res.send(JSON.stringify(result));
			}
		}
	)
});

module.exports = router;
