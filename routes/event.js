var express = require('express');
var router = express.Router();

const Event = require("../models/event.js");

router.get('/all', function(req, res, next) {

	Event.find({}, function(err, events) {
		console.log(events);
		res.send(JSON.stringify(events));
	});
});

router.post('/add_event', function(req, res, next) {
	console.log(req.body);
	const event = new Event(
	{
		name: req.body.name,
		content: req.body.content,
		date: req.body.date,
		location: req.body.location,
		restaurantId: req.body.id,

	});
	event.save();
	res.send({message: "ok"});
});


router.post('/register_event', function(req, res, next) {
	let userId = req.body.userId;
	let eventId = req.body.eventId;
	Event.update(
		{ _id: eventId },
		{ 
			$push: 
			{ 
				userId: userId
				
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


router.post('/search', function(req, res, next) {
	let keyword = req.body.keyword;
	Event.find({ 
		$or : [ 
			{name: { $regex: `.*${keyword}.*` }},
			{content: { $regex: `.*${keyword}.*` }},
			{date: { $regex: `.*${keyword}.*` }},
			{location: { $regex: `.*${keyword}.*` }}
		]
	}, function(err, events) {
		console.log(events);
		res.send(JSON.stringify(events));
	});
});


module.exports = router;
