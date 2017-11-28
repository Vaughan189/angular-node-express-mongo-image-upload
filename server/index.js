var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// create express app
var app = express();
app.use(express.static(__dirname + '/public'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');


mongoose.connect(dbConfig.url, { useMongoClient: true });

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.open('open', function() {
    console.log("Successfully connected to the database");
});

//create a cors middleware
app.use(function(req, res, next) {
    //set headers to allow cross origin request.
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

// define a simple route
app.get('/', function(req, res) {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// Require Notes routes
require('./app/routes/image.routes.js')(app);

// listen for requests
app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});