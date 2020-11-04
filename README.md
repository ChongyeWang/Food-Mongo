# A Yelp-Like Application
 
## Introduction 

#### This is a yelp-like web application using Node.js MongoDB, React and Kafka. The application involves backend development #### and frontend development and their interactions. It involves two systems including user customer system and restaurant #### system. Registered restaurants can provide services including adding dishes, adding events, messaging  customers etc #### and customers can use the system to view restaurants on map, order foods, message restaurants, join events etc.

#### Customer: Register and Login. Search and view restaurants. View and register for events. Add reviews to restaurant. #### Update Profile and view restaurants profile. Order dishes and place order. Message Restaurants. Follow other 
#### customers.

#### Restaurant: register and login. Manage order and event. View customer profile. Add dishes and events. Message 
#### customers. View reviews. Update profile.

#### The system will handle the request based on whether the login user is customer or restaurants. The frontend 
#### implementation is used react to maintain current state of user input and send the data to backend. The database 
#### implementation uses mongodb and retrieve data based on user request. 

## Framework
### Node.js, React, Redux, MongoDB, JWT, Kafka

## Usage

#### 1. Download the repo
#### 2. Install the dependency
#### 3. Run node app.js for backend
#### 4. Change into client directory and run npm start for frontend

## Why MongoDB?
#### The mongoDB performance is generally better than MySQL. Compared to previously MySQL implementation, the 
#### mongoDB is more flexible and avoids multiple join operation, which greatly improves performance. Also, mongoDB 
#### allows insert great amount of data at the same time and MySQL has to insert data one by one. The MySQL requires #### structured data while mongoDB handles unstructured data pretty well. The mongoDB used JSON document and are #### more flexible and easier to implement by allowing json object and arrays, avoiding the limitation of rows and columns of #### tables. Also, mongoDB has many support-in and the application can be scaled easily, which can help to improve 
#### performance in various aspects as well.

## Why JWT?
#### JWT provides unique encrypted token during the request process.Therefore, when the user logged in the backend will #### assign a token and the client side will save it in localStorage and all request that needs authentication will be verified for #### token. Previously, user log in by providing only username and password. With the middleware provided, only request #### that have been verified valid will be allowed. The passport will check authentication of the user before accessing the api. #### If the authentication fails, the next request handler will not be called. Meanwhile, the passport middleware is flexible and #### easy to integrate into an application and keeps the project maintainable and scalable.


## Why Kafka?
#### Kafka can handle real time large amount of stream data. By sending data from producer to consumer, kafka allows more #### efficient data transmission and compression, reducing latency and improving performance. Also, kafka uses filesystem #### for storage and caching and applies sequential IO for request and avoids random access memory, therefore greatly #### reduces latency. The batch processing allows kafka to handle chunks of messages together and data compression can #### improve the performance on the client side. Multiple consumers can concurrently request from the topic without adding #### much traffic and latency.

