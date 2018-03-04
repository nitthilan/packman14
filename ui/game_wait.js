var inputBox;
var GameWait = {

	
	preload: ()=>{
		game.load.nineSlice('input', 'assets/inputfield.png', 15);
	},

	create: function(){
		alert("Wait state");
		var join = game.input.keyboard.addKey(Phaser.Keyboard.J);
		join.onDown.add(this.startGame, this);

		inputBox = game.add.inputField(game.width / 2 - 85, 180 - 17, {
            font: '18px Arial',
            fill: '#ffffff',
            fillAlpha: 0.5,
            fontWeight: 'bold',
            forceCase: PhaserInput.ForceCase.upper,
            width: 150,
            max: 20,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Username',
            textAlign: 'center',
            zoom: true
        });
		var buttonJOIN = game.add.button(game.world.centerX, game.world.centerY,
		 'singlePlayerButton', () => {this.buttonHandler('J')}, this, 0, 1, 2, 3);
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