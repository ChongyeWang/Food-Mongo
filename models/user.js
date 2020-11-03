// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    web: {type: String},
    things: {type: String},
    address: {type: String},

    order: [
      {
        restaurantId: { type: String },
        content: { type: String },
        status: { type: String },
      }
    ],

    following: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
