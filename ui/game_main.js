

var game = new Phaser.Game(448, 496, Phaser.AUTO, "game");

game.state.add('gameLocal', PacmanGame);
game.state.add('menu', GameMenu);
game.state.start('menu');

