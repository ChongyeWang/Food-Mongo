const kafka = require('kafka-node');
const bodyParser = require('body-parser');

const express = require('express');
const mongoose = require('mongoose');

const app = express();



        var secrets = require('./config/secrets');
        var options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 500,
            bufferMaxEntries: 0
        };

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : false}));
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

            require('./r/routes')(app,producer,kafka_topic);

          })
}
catch(e) {

    console.log(e);
}


app.listen(4567,() => {
    console.log('app is listening to port 4567')
})



