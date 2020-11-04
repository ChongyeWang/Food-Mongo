// Load required packages
var mongoose = require('mongoose');

// Define our event schema
var Messageschema = new mongoose.Schema({
    userId: {type: String},
    restaurantId: {type: String},
    content: {type: String},
    date: {type: String},
});

class Post {

    static insertMessage({ userId,restaurantId,content,date }){
        const message = this({
            userId: userId,
            restaurantId: restaurantId,
            content: content,
            date: date
        })

        return message.save();
    }

}


Messageschema.loadClass(Post);
// Export the Mongoose model
module.exports = mongoose.model('Message', Messageschema);
