// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var RestaurantSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true}, 
    phone: {type: String, required: true},
    location: {type: String, required: true},
    lat: {type: String, required: true},
    lon: {type: String, required: true},

    dish: [
        {
          name: { type: String },
          category: { type: String },
          price: { type: String },
        }
    ],
    order: [
      {
        userId: { type: String },
        content: { type: String },
        status: { type: String },
        date: { type: String },
      }
    ],

    review: [
        {
          content: { type: String },
          date: { type: String },
        }
    ],

});

// Export the Mongoose model
module.exports = mongoose.model('Restaurant', RestaurantSchema);
