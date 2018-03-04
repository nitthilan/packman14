var GameMenu = {

	preload: () => {
		//game.load.nineSlice('btn', 
		//	'assets/button.png', 0, 0, 0, 0);
		game.load.spritesheet('singlePlayerButton', 'assets/button.png', 256, 80, 3);
		//game.add.nineSlice(100, 100, 'singlePlayerButton', 200, 50);
		//con.resize(100, 200);
	},

	create: function(){
		//alert("menu");
		//var con = game.add.nineSlice(game.width / 2 , 100, 'btn', null, 25, 25);
		//con.resize(100, 200);

		//alert("menu");
		
		var buttonS = game.add.button(game.world.centerX, game.world.centerY,
				 'singlePlayerButton', () => {this.buttonHandler('S')}, this, 1, 0, 3);
		var buttonM = game.add.button(game.world.centerX, game.world.centerY + 105,
				 'singlePlayerButton', () => {this.buttonHandler('M')}, this, 1, 0, 3);

		var style0 = { font: "32px Arial", fill: "#ff0044", wordWrap: true, 
				wordWrapWidth: 200, align: "center", backgroundColor: 'transparent' };
		var text0 = game.add.text(game.world.centerX+25, game.world.centerY + 20, "single player", style0);

		var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, 
			wordWrapWidth: 2000, align: "center", backgroundColor: 'transparent' };
		var text = game.add.text(game.world.centerX+25, game.world.centerY + 120, "multi player", style);
	
		


	},
	update: function(){
		//this.con.resize(100, 100);
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