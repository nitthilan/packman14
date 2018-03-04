//client

var socket = require('socket.io-client')('http://localhost:3000');
//var socket = io.connect('http://127.0.0.1:4200');
 socket.on('connect', function(data) {
    //socket.emit('join', 'Hello World from client');
    //setTimeout(function(){
    //	socket.emit('messages', 'Just checking');
    //}, 5000);
	 //socket.emit('addUser', 'mgiridhar');
	 //socket.emit('addUser', 'nitthilan');
	 //socket.emit('playerExists', 'mgiridhar');
	 //socket.emit('playerExists', 'nitthilan');
	 //socket.emit('addGame', 'mgiridhar')
	 socket.emit('addGamePlayer', '455,mgiridhar');
	 socket.emit('addGamePlayer', '455,nitthilan');
 });

//socket.on('messages', function(data) {
	//alert(data);
//	console.log(data);
//});
