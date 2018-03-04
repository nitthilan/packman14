module.exports = function() {

  return {
    games: {},
    users: {}
  }

  //return {"games":{"5665":{"id":5665,"name":"Game-5665","players":{"mgiridhar":{"scores":0,"color":"white"}," nitthilan":{"scores":0,"color":"yellow"}}}},"users":{"mgiridhar":{"username":"mgiridhar","high_score":0,"num_wins":0},"nitthilan":{"username":"nitthilan","high_score":0,"num_wins":0}}};

  /*
  var games = {};
  var users = {};

  var getGames = function() {
    //return Object.keys(this.onGamesList).map(function(key) {
    //  return this.onGamesList[key];
    //});
    return this.onGamesList;
  }

  var getUsers = function() {
    //return Object.keys(this.usersList).map(function(key) {
    //  return this.usersList[key];
    //});
    return this.usersList;
  }*/
}
