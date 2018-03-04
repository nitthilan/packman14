var GameMenu = {

	preload: () => {
		game.load.spritesheet('singlePlayerButton', 
			'assets/button.png', 100, 100, 4);
	},

	create: function(){
		//alert("menu");
		alert("menu");
		var buttonS = game.add.button(game.world.centerX, game.world.centerY,
				 'singlePlayerButton', () => {this.buttonHandler('S')}, this, 0, 1, 2, 3);
		var buttonM = game.add.button(game.world.centerX, game.world.centerY + 105,
				 'singlePlayerButton', () => {this.buttonHandler('M')}, this, 0, 1, 2, 3);
		var singlePlayerMode= game.input.keyboard.addKey(Phaser.Keyboard.S);
		var multiPlayerMode= game.input.keyboard.addKey(Phaser.Keyboard.M);
		singlePlayerMode.onDown.add(() => {this.restart('S')}, this);
		multiPlayerMode.onDown.add(() => {this.restart('M')}, this);

	},

	buttonHandler: (strKey) => {
		if(strKey === 'S')
			game.state.start('gameLocal', true, false);
		else if(strKey === 'M')
			game.state.start('wait', true, false);
	},

	restart: function(strKey) {
		
		if(strKey === 'S')
			game.state.start('gameLocal', true, false);
		else if(strKey === 'M')
			game.state.start('wait', true, false);
	},

};