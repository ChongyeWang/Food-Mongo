var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const kafka = require('kafka-node');

const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var restaurantRouter = require('./routes/restaurant');

var cors = require('cors');



var app = express();



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : false}));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });


// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', function(req, res) {
// 	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


var mongoose = require('mongoose');
var secrets = require('./config/secrets');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};


try{

    /**
     * Kafka Producer Configuration
     */
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient('localhost:2181')
    const producer = new Producer(client);

    const kafka_topic = 'feed-service';        

        producer.on('ready',async function() {

            console.log('Kafka Producer is Ready');
        })

        producer.on('error', function(err) {
            console.log(err);
            console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
            throw err;
          });


       

        mongoose.connect(secrets.mongo_connection, options)

          .then((err,res) => {

            console.log('MongoDB connected successfully');
            
            require('./routes/users')(app,producer,kafka_topic);
            //require('./r/routes')(app,producer,kafka_topic);

          })
}
catch(e) {

    console.log(e);
}


// mongoose.connect(secrets.mongo_connection, options);


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/restaurant', restaurantRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });



// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

module.exports = app;
