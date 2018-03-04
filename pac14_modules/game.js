module.exports = function(gameMaster, log) {

  var numPlayers = 2;

  var addGame = function(username) {
    var gameId = ""+Math.round(Math.random() * 10000); // generate random game id
    gameMaster.games[gameId] = {};
    gameMaster.games[gameId]['id'] = gameId;
    gameMaster.games[gameId]['name'] = gameId;
    gameMaster.games[gameId]['players'] = {};
    gameMaster.games[gameId]['players'][username] = {'scores': 0 , 'color': 'white'};
    //gameMaster.games[gameId]['scores'] = [0];
    return gameId;
  }

  var addPlayer = function(gameId, playerName) {
    if(!gameMaster.games[gameId]) {
      log.warn(gameId + ' Not available for getting');
      return false;
    }
    if(Object.keys(gameMaster.games[gameId]['players']).length >= numPlayers || !!(gameMaster.games[gameId]['players'][playerName])) {
      log.warn(Object.keys(gameMaster.games[gameId]['players']).length);
      log.warn(gameMaster.games[gameId]['players'][playerName]);
      return false;
    }
    gameMaster.games[gameId]['players'][playerName] = {'scores': 0 , 'color': 'yellow'};

    return true;
  }

  var getGameState = function(gameId) {
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

  var updateCursor = function(gameId, name, cursor) {
    if(!gameMaster.games[gameId]) {
      log.warn(gameId + ' Not available for deletion');
    }
    gameMaster.games[gameId]['players'][name]['cursor'] = cursor;
  }

  var getGamePlayers = function(gameId) {
    log.warn("Get game players ", gameId)
    return Object.keys(gameMaster.games[gameId]['players']);
  }

  return {
    numPlayers: numPlayers,
    addGame: addGame,
    addPlayer: addPlayer,
    getGameState: getGameState,
    deleteGame: deleteGame,
    updateCursor: updateCursor,
    getGamePlayers: getGamePlayers
  }
}
