

var game = new Phaser.Game(448, 496, Phaser.AUTO, "game");

Phaser.Device.whenReady(function () {
    game.plugins.add(PhaserInput.Plugin);
    game.plugins.add(PhaserNineSlice.Plugin);
});

game.state.add('gameLocal', PacmanGame);
game.state.add('end', GameEnd);
game.state.add('wait', GameWait);
game.state.add('menu', GameMenu);
game.state.start('menu');

