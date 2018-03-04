var GameMenu = {

	preload: () => {

	},
	
	create: function(){
		//alert("menu");
		alert("menu");
		var button = new LabelButton(game, game.world.centerX, game.world.centerY, "", "BUT", )
		var singlePlayerMode= game.input.keyboard.addKey(Phaser.Keyboard.S);
		var multiPlayerMode= game.input.keyboard.addKey(Phaser.Keyboard.M);
		singlePlayerMode.onDown.add(() => {this.restart('S')}, this);
		multiPlayerMode.onDown.add(() => {this.restart('M')}, this);

	},

	restart: function(strKey) {
		
		if(strKey === 'S')
			game.state.start('gameLocal', true, false);
		else if(strKey === 'M')
			game.state.start('wait', true, false);
	}

};