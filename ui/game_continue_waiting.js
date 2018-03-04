var GameContinueWaiting = {
	init: () => {
		
	},

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
		
		var style0 = { font: "32px Arial", fill: "#ff0044", wordWrap: true, 
				wordWrapWidth: 200, align: "center", backgroundColor: 'transparent' };
		var text0 = game.add.text(game.world.centerX+25-128, game.world.centerY + 20, "Waiting for player 2", style0);

		pac_socket.on("sendGSForPlayer1", function(game_state){
			global_game_state = game_state
			game.state.start('gameRemote', true, false);

		});


	},
	update: function(){
		//this.con.resize(100, 100);
	},

	restart: function(strKey) {
		
		if(strKey === 'S')
			game.state.start('gameLocal', true, false);
		else if(strKey === 'M')
			game.state.start('wait', true, false);
	},

};