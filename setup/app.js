// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

// Create Logging for application
var logger = require('./log.js');
var log = logger.appLogger;

// Load configurations
var env = process.env.NODE_ENV || 'development' ,
    config = require('./config')[env];

// Paths
var config_path = config.root + '/setup/config'


app.use(express.static(config.static_path + '/ui'));

io.on('connection', function(client){
})

server.listen(config.port);  