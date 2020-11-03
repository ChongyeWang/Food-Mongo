// Load required packages
var mongoose = require('mongoose');

// Define our event schema
var EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: String, required: true},
    location: {type: String, required: true},
    restaurantId:  {type: String, required: true},
    userId :[String]
});

// Export the Mongoose model
module.exports = mongoose.model('Event', EventSchema);
