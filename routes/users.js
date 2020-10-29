var express = require('express');
var router = express.Router();
const multer = require("multer");

const jwt = require('jsonwebtoken');
const { secret } = require('.././config/secrets.js');
const { auth } = require(".././config/passport.js");
auth();

const User = require(".././models/user.js");

const upload = multer({
	storage: multer.diskStorage({
		destination: "./client/src/public/uploads/",
		filename: function(req, file, cb){
		   cb(null, "IMAGE-" + file.originalname);
		}
	 }),
	limits:{fileSize: 1000000},
 }).single("myImage");

module.exports = (app,producer,kafka_topic) => {

    // app.get('/', function(req, res, next) {

    //     User.find({}, function(err, users) {
    //         console.log(users);
    //         res.send(JSON.stringify({ x: 5, y: 6 }));
            
    //     });
    // });

    app.post('/users/register', function(req, res, next) {
        console.log(req.body);
        User.find({}, function(err, users) {
            var username = req.body.username;
            users = users.filter(user => user["username"] === username);
            if(users.length !== 0) {
                res.status(409).send("Conflict");
                console.log(0)
            }
            else {
                if (err) {
                    res.status(404).send("Not found");
                    console.log(1)
                }
                else {
                    console.log(3)
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


    app.post('/users/login', (req, res) => {

        User.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
            if (error) {
                res.status(500).end("Error Occured");
                console.log(1)
            }
            if (user) {
                const payload = { _id: user._id, username: user.username};
                const token = jwt.sign(payload, secret, {
                    expiresIn: 1008000
                });
                console.log(2);
                console.log(token);
                console.log(user);
                res.send({message: "ok", token: "JWT " + token});
                // res.status(200).end("JWT " + token);
            }
            else {
                console.log(3);
                res.status(401).end("Invalid Credentials");
            }
        });
    });

    app.get('/users/profile/:id', (req, res) => {
        var id = req.params.id;
        User.findById(id, (error, user) => {
            if (error) {
                res.status(500).end("Error Occured");
            }
            if (user) {
                 var data = {
                    'id': user.id,
                    'name': user.username,
                    'email': user.email,
                    'phone': user.phone,
                    'things': user.things,
                    'address': user.address
                }
                res.send({message: "ok", data: data});
                console.log("Restaurant found");
            }
            else {
                console.log("Not found");
                res.status(401).end("Not found");
            }
        });
    });


    app.post('/users/edit', (req, res) => {
        var id = req.body.id;
        var email = req.body.email;
        var phone = req.body.phone;
        var things = req.body.things;
        var address = req.body.address;
        User.update(
            { _id: id },
            { 
                email: email,
                phone: phone,
                things: things,
                address: address
            },
    
            function( err, result ) {
                if ( err ) res.status(500).end("Error Occured");
                else {
                    res.send({message: "ok"});
                }
            }
        ) 
    });



    app.post('/users/upload-picture', function(req,res){
        upload(req, res, (err) => {
            console.log("Request ---", req.body);
            console.log("Request file ---", req.file);
            if(!err)
                return res.send(200).end();
         });
    });
    

}



