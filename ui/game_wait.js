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
       	var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, 
			wordWrapWidth: 2000, align: "center", backgroundColor: 'transparent' };
		var waiting_text = game.add.text(game.world.centerX+25-128, game.world.centerY + 15, "WAITING", style);

		var that = this;

		pac_socket.emit('getGameMaster', function(gameMaster){
			var numGames = Object.keys(gameMaster.games).length
			console.log("received getGameMaster ", JSON.stringify(gameMaster), numGames)

			if(numGames==1){
				waiting_text.destroy()
				var keys_list = Object.keys(gameMaster.games)
				var gameState = gameMaster.games[keys_list[0]]
				var game_id = gameState['id']
				if(Object.keys(gameState['players']).length == 1){
					var buttonM = game.add.button(game.world.centerX-128, game.world.centerY,
						 'singlePlayerButton', () => {that.buttonHandler('JOIN', game_id)}, this, 1, 0, 3);

					var text = game.add.text(game.world.centerX+25-128, game.world.centerY + 15, "JOIN "+game_id, style);
				}
				else{
					var buttonM = game.add.button(game.world.centerX-128, game.world.centerY,
						 'singlePlayerButton', () => {that.buttonHandler('GO BACK')}, this, 1, 0, 3);

					var text = game.add.text(game.world.centerX+25-128, game.world.centerY + 15, "SORRY. GO BACK.", style);
					
				}
			}
			else{
				waiting_text.destroy()
				var buttonM = game.add.button(game.world.centerX-128, game.world.centerY,
						 'singlePlayerButton', () => {that.buttonHandler('NEW')}, this, 1, 0, 3);
				var text = game.add.text(game.world.centerX+25-128, game.world.centerY + 15, "NEW", style);
				
			}

		});


	},

	// keyPressed: "No Key"

	buttonHandler: (keyPressed, game_id) => {
		var username = inputBox.value;

		if(keyPressed === 'NEW'){
			pac_socket.emit('addGame',username, function(){
				global_local_username = username
				game.state.start('GameContinueWaiting', true, false);

			})
		}
		else if(keyPressed === 'JOIN'){
			pac_socket.emit('addGamePlayer', game_id, username, function(game_state){
				global_game_state = game_state
				global_local_username = username
				game.state.start('gameRemote', true, false);

			})
		}else if(keyPressed === 'GO BACK'){
			game.state.start('menu', true, false);
		}
		else{
			console.log("No Key pressed. Should not handled")
			game.state.start('wait', true, false);
		}
	},

	startGame: ()=>{

		game.state.start('gameLocal');
	},

};