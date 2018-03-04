var inputBox;
var GameWait = {

	
	preload: ()=>{
		//game.load.nineSlice('input', 'assets/inputfield.png', 15);
		game.load.spritesheet('singlePlayerButton', 'assets/button.png', 256, 80, 3);

	},

	create: function(){
		// alert("Wait state");
		// var join = game.input.keyboard.addKey(Phaser.Keyboard.J);
		// join.onDown.add(this.startGame, this);

		inputBox = game.add.inputField(game.world.centerX-128-8, game.world.centerY - 90, {
            font: '30px Arial',
            fill: '#ffffff',
            fillAlpha: 0.5,
            fontWeight: 'bold',
            forceCase: PhaserInput.ForceCase.upper,
            width: 256,
            max: 20,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Username',
            textAlign: 'center',
            zoom: true
        });
        var buttonM = game.add.button(game.world.centerX-128, game.world.centerY,
				 'singlePlayerButton', () => {this.buttonHandler('M')}, this, 1, 0, 3);
      	var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, 
			wordWrapWidth: 2000, align: "center", backgroundColor: 'transparent' };
		var text = game.add.text(game.world.centerX+25-128, game.world.centerY + 15, "WAITING", style);

		pac_socket.emit('getGameMaster', function(gameMaster){
			var numGames = Object.keys(gameMaster.games).length
			if(numGames==1){
				var keys_list = Object.keys(gameMaster.games)
				var gameState = gameMaster.games[keys_list[0]]
				var game_id = gameState['id']
			}
			else{
				var text = game.add.text(game.world.centerX+25-128, game.world.centerY + 15, "NEW", style);
			}

		});


	},

	buttonHandler: (strKey) => {
		if(strKey === 'J'){
			username = inputBox.value;
			game.state.start('gameLocal', true, false);
		}
		else if(strKey === 'M')
			game.state.start('wait', true, false);
	},

	startGame: ()=>{

		game.state.start('gameLocal');
	},

};