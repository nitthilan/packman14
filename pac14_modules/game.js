module.exports = function(gameMaster, log) {

  var numPlayers = 2;

  var addGame = function(username) {
    var gameId = Math.round(Math.random() * 10000); // generate random game id
    gameMaster.games[gameId] = {};
    gameMaster.games[gameId]['id'] = gameId;
    gameMaster.games[gameId]['name'] = 'Game-' + gameId;
    gameMaster.games[gameId]['players'] = [username];
    gameMaster.games[gameId]['scores'] = [0];
    return gameId;
  }

  var addPlayer = function(gameId, playerName) {
    if(!gameMaster.games[gameId]) {
      log.warn(gameId + ' Not available for getting');
      return false;
    }
    if(gameMaster.games[gameId]['players'].length >= this.numPlayers || gameMaster.games[gameId]['players'].indexOf(playerName) >= 0) {
      return false;
    }
    gameMaster.games[gameId]['players'].push(playerName);
    gameMaster.games[gameId]['scores'].push(0);
    return true;
  }

  var getGameObj = function(gameId) {
    if(!gameMaster.games[gameId]) {
      log.warn(gameId + ' Not available for getting');
    }
    return gameMaster.games[gameId];
  }

  var deleteGame = function(gameId) {
    if(!gameMaster.games[gameId]) {
      log.warn(gameId + ' Not available for deletion');
    }
    delete gameMaster.games[gameId];
  }
  return {
    numPlayers: numPlayers,
    addGame: addGame,
    addPlayer: addPlayer,
    getGameObj: getGameObj,
    deleteGame: deleteGame
  }
}
