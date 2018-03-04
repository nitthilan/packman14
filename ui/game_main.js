

var game = new Phaser.Game(448, 496, Phaser.AUTO, "game");
var pac_socket = io();
var global_game_state = null;
var global_local_username = null;

// var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, "game");

Phaser.Device.whenReady(function () {
    game.plugins.add(PhaserInput.Plugin);
    game.plugins.add(PhaserNineSlice.Plugin);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

});

game.state.add('gameRemote', PacmanGame);
game.state.add('gameLocal', singlePacmanGame);
game.state.add('end', GameEnd);
game.state.add('wait', GameWait);
game.state.add('menu', GameMenu);
game.state.add('GameContinueWaiting', GameContinueWaiting);

game.state.start('menu');

