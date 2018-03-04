var Pacman1 = function(game, key, otherPlayerId) {   
    this.game = game;
    this.key = key;

    this.otherPlayerId = otherPlayerId

    console.log("otherPlayerId", this.otherPlayerId)
    
    this.speed = 150;
    this.isDead = false;
    this.isAnimatingDeath = false;
    this.keyPressTimer = 0;
    
    this.gridsize = this.game.gridsize;
    this.safetile = this.game.safetile;

    this.marker = new Phaser.Point();
    this.turnPoint = new Phaser.Point();
    this.threshold = 6;

    this.directions = [ null, null, null, null, null ];
    this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

    this.current = Phaser.NONE;
    this.turning = Phaser.NONE;
    this.want2go = Phaser.NONE;
    
    this.keyPressTimer = 0;
    this.KEY_COOLING_DOWN_TIME = 750;
    
    //  Position Pacman at grid location 14x17 (the +8 accounts for his anchor)
    this.sprite = this.game.add.sprite((14 * 16) + 8, (17 * 16) + 8, key, 0);
    this.sprite.anchor.setTo(0.5);
    this.sprite.animations.add('munch', [0, 1, 2, 1], 20, true);
    this.sprite.animations.add("death", [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 10, false);
    
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(16, 16, 0, 0);
    
    this.sprite.play('munch');
    this.move(Phaser.LEFT);    
};

Pacman1.prototype.move = function(direction) {
    if (direction === Phaser.NONE) {
        this.sprite.body.velocity.x = this.sprite.body.velocity.y = 0;
        return;
    }
    
    var speed = this.speed;

    if (direction === Phaser.LEFT || direction === Phaser.UP)
    {
        speed = -speed;
    }

    if (direction === Phaser.LEFT || direction === Phaser.RIGHT)
    {
        this.sprite.body.velocity.x = speed;
    }
    else
    {
        this.sprite.body.velocity.y = speed;
    }

    //  Reset the scale and angle (Pacman is facing to the right in the sprite sheet)
    this.sprite.scale.x = 1;
    this.sprite.angle = 0;

    if (direction === Phaser.LEFT)
    {
        this.sprite.scale.x = -1;
    }
    else if (direction === Phaser.UP)
    {
        this.sprite.angle = 270;
    }
    else if (direction === Phaser.DOWN)
    {
        this.sprite.angle = 90;
    }

    this.current = direction;
};

Pacman1.prototype.update = function() {
    if (!this.isDead) {
        //this.sprite.body.reset()
        this.game.physics.arcade.collide(this.sprite, this.game.layer);
        this.game.physics.arcade.overlap(this.sprite, this.game.dots, this.eatDot, null, this);
        this.game.physics.arcade.overlap(this.sprite, this.game.pills, this.eatPill, null, this);

        this.marker.x = this.game.math.snapToFloor(Math.floor(this.sprite.x), this.gridsize) / this.gridsize;
        this.marker.y = this.game.math.snapToFloor(Math.floor(this.sprite.y), this.gridsize) / this.gridsize;

        if (this.marker.x < 0) {
            this.sprite.x = this.game.map.widthInPixels - 1;
        }
        if (this.marker.x >= this.game.map.width) {
            this.sprite.x = 1;
        }

        if(global_game_state['players'][this.otherPlayerId]['sprite_x']){
            this.sprite.x = global_game_state['players'][this.otherPlayerId]['sprite_x'];
        }
        if(global_game_state['players'][this.otherPlayerId]['sprite_y']){
            this.sprite.y = global_game_state['players'][this.otherPlayerId]['sprite_y'];
        }
        // console.log("Pac Man 1 ", this.sprite.x, this.sprite.y, this.otherPlayerId);

        // //  Update our grid sensors
        // this.directions[1] = this.game.map.getTileLeft(this.game.layer.index, this.marker.x, this.marker.y);
        // this.directions[2] = this.game.map.getTileRight(this.game.layer.index, this.marker.x, this.marker.y);
        // this.directions[3] = this.game.map.getTileAbove(this.game.layer.index, this.marker.x, this.marker.y);
        // this.directions[4] = this.game.map.getTileBelow(this.game.layer.index, this.marker.x, this.marker.y);

        // if (this.turning !== Phaser.NONE)
        // {
        //     this.turn();
        // }
    } else {
        this.move(Phaser.NONE);
        if (!this.isAnimatingDeath) {
            this.sprite.play("death");
            this.isAnimatingDeath = true;
        }
    }
};

Pacman1.prototype.checkKeys = function() {
    // if (cursors.left ||
    //     cursors.right ||
    //     cursors.up ||
    //     cursors.down) {
    //     this.keyPressTimer = this.game.time.time + this.KEY_COOLING_DOWN_TIME;
    // }

    // var local2go = null;
    // var localTuring = null;

    // if (cursors['left'] && this.current !== Phaser.LEFT)
    // {
    //     this.want2go = Phaser.LEFT;
    // }
    // else if (cursors['right'] && this.current !== Phaser.RIGHT)

    // {
    //     //alert('called');
    //     this.want2go = Phaser.RIGHT;
    // }
    // else if (cursors['up'] && this.current !== Phaser.UP)
    // {
    //     this.want2go = Phaser.UP;
    // }
    // else if (cursors['down'] && this.current !== Phaser.DOWN)
    // {
    //     this.want2go = Phaser.DOWN;
    // }


    // if (this.game.time.time > this.keyPressTimer)
    // {
    //     //  This forces them to hold the key down to turn the corner

    //     this.turning = Phaser.NONE;
    //     this.want2go = Phaser.NONE;
    // } else {
    // console.log("OTHER PLAYER ID ",this.otherPlayerId, global_game_state)
    // if('want2go' in global_game_state['players'][this.otherPlayerId]){
    //     this.want2go = global_game_state['players'][this.otherPlayerId]['want2go']
    //     console.log("PACMAN1 Wants to go ", this.want2go);
    //     this.checkDirection(this.want2go);    

    // }
    // }
};

Pacman1.prototype.eatDot = function(pacman, dot) {
    dot.kill();
    
    this.game.score ++;
    this.game.numDots --;

    if (this.game.dots.total === 0)
    {
        this.game.dots.callAll('revive');
    }
};

Pacman1.prototype.eatPill = function(pacman, pill) {
    pill.kill();
    
    this.game.score ++;
    this.game.numPills --;
    
    this.game.enterFrightenedMode();
};

Pacman1.prototype.turn = function () {
    var cx = Math.floor(this.sprite.x);
    var cy = Math.floor(this.sprite.y);

    //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
    if (!this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
    {
        return false;
    }

    //  Grid align before turning
    this.sprite.x = this.turnPoint.x;
    this.sprite.y = this.turnPoint.y;

    this.sprite.body.reset(this.turnPoint.x, this.turnPoint.y);
    this.move(this.turning);
    this.turning = Phaser.NONE;

    return true;
};

Pacman1.prototype.checkDirection = function (turnTo) {
    if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.safetile)
    {
        //  Invalid direction if they're already set to turn that way
        //  Or there is no tile there, or the tile isn't index 1 (a floor tile)
        return;
    }

    //  Check if they want to turn around and can
    if (this.current === this.opposites[turnTo])
    {
        this.move(turnTo);
        this.keyPressTimer = this.game.time.time;
    }
    else
    {
        this.turning = turnTo;

        this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
        this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
        this.want2go = Phaser.NONE;
    }
};

Pacman1.prototype.getPosition = function () {
    return new Phaser.Point((this.marker.x * this.gridsize) + (this.gridsize / 2), (this.marker.y * this.gridsize) + (this.gridsize / 2));
};

Pacman1.prototype.getCurrentDirection = function() {
    return this.current;
};
