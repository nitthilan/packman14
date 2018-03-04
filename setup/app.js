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

/*app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/../ui/index.html');
});*/

//Game Master
var gameMaster = require(config.root + '/pac14_modules/gameMaster.js')();

//Player
var player = require(config.root + '/pac14_modules/player.js')(gameMaster, log);
//var players = new player(games);
//console.log(player);
//Game
var game = require(config.root + '/pac14_modules/game.js')(gameMaster, log);

//var games = new gameMaster(game, player);
//console.log(games.onGamesList);
//console.log(games.usersList);

io.on('connection', function(client){
  client.on('addUser', function(name) {
    //console.log(name);
    player.add(name);
    console.log(gameMaster);
  });
  client.on('playerExists', function(name) {
    //console.log(name);
    console.log(player.exists(name));
    console.log(gameMaster);
  });
  client.on('addGame', function(name) {
    var gameId = game.addGame(name);
    //console.log(gameId);
    //game.addGame(gameId,name);
    console.log(gameMaster);
  });
  client.on('addGamePlayer', function(data) {
    var gameId = data.split(',')[0];
    var name = data.split(',')[1];
    console.log(game.addPlayer(gameId, name));
    console.log(JSON.stringify(gameMaster));
  });

})

server.listen(config.port);
