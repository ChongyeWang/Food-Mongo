/*
 * You generally want to .gitignore this file to prevent important credentials from being stored on your public repo.
 */
module.exports = {
    token : "secret-starter-mern",
    secret: "cmpe273_secret_key",
    mongo_connection : "mongodb+srv://yangcong:85DdKGtUuEs7Xez0@cluster0.fff0r.mongodb.net/Food?retryWrites=true&w=majority"
    
    //mongo_connection : "mongodb://congyang:V3d78JEgVXJ5tePR@cluster0-shard-00-00.fff0r.mongodb.net:27017,cluster0-shard-00-01.fff0r.mongodb.net:27017,cluster0-shard-00-02.fff0r.mongodb.net:27017/Food?ssl=true&replicaSet=atlas-478cg3-shard-0&authSource=admin&retryWrites=true&w=majority"
};

