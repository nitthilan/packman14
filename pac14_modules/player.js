module.exports = function(gameMaster, log) {

  //this.username = username;
  //this.score = 0;

  var add = function(username) {
    if(!gameMaster.users[username]) {
      //if(this.users.indexOf(newUser) == -1) {
      gameMaster.users[username] = {};
      gameMaster.users[username]['username'] = username;
      gameMaster.users[username]['high_score'] = 0;
      gameMaster.users[username]['num_wins'] = 0;
    }
    else {
      log.warn(username + ' already available');
    }
  }

  var exists = function(username) {
    //return this.users.indexOf(username) >= 0;
    return !!gameMaster.users[username];
  }

  var getUser = function(username) {
    if(!gameMaster.users[username]) {
      log.warn(username + ' not available for getting');
    }
    return gameMaster.users[username];
  }

  return {
    add: add,
    exists: exists,
    getUser: getUser
  }
}
