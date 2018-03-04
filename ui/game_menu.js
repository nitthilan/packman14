var GameMenu = {
	create: function(){
		//alert("menu");
		var keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
		keyR.onDown.add(this.restart, this);

	},

	restart: function() {
		alert("menu");
		game.state.start('gameLocal', true, false);
	}

};