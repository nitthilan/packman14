var GameWait = {

	create: function(){
		alert("Wait state");
		var join = game.input.keyboard.addKey(Phaser.Keyboard.J);
		join.onDown.add(this.startGame, this);
	},

	startGame: ()=>{

		game.state.start('gameLocal');
	},

};