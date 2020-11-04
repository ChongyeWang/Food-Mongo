// Load required packages
var mongoose = require('mongoose');

// Define our event schema
var Messageschema = new mongoose.Schema({
    userId: {type: String},
    restaurantId: {type: String},
    content: {type: String},
    date: {type: String, required: true},
});

// Export the Mongoose model
module.exports = mongoose.model('Message', Messageschema);
