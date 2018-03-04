//var game = new Phaser.Game(448, 496, Phaser.AUTO, "game");

// var username = 'mgiridhar';
var PacmanGame = function () {};
// var currentMode = 0;
// var currentGameInfo = {
//     'gameId': "5665",
//     'players': {"mgiridhar": {'cursors': {'up': false, 'down': false, 'left': true, 'right': false},
//                             'truning': null, 
//                             'want2go': null,
//                             'isDead': false},
//                 'nitthilan': {'cursors': {'up': false, 'down': false, 'left': false, 'right': true},
//                             'truning': null, 
//                             'want2go': null,
//                             'isDead': false} },
//     'ghosts':{},
// };

// currentGameInfo['players'][username] = {'cursors': {'up': false, 'down': false, 'left': true, 'right': false},
//                             'truning': null, 
//                             'want2go': null,
//                             'isDead': false,
//                             'playerId': 0};
// currentGameInfo['players'][otherplayer] = {'cursors': {'up': false, 'down': false, 'left': false, 'right': true},
//                             'truning': null, 
//                             'want2go': null,
//                             'isDead': false,
//                             'playerId': 1};

PacmanGame.prototype = {


    resetData: function(){

        // Object.keys(global_game_state['players']).forEach(function(key) {
        //     global_game_state['players'][key]['cursors'] = {'up': false, 'down': false, 'left': true, 'right': false};
        //     console.log("Reseting state ", key, global_game_state[key]);
        // });

        // currentGameInfo = {
        //     'gameId': "5665",
        //     'players': {},
        //     'ghosts': {}
        // };
        // currentGameInfo['players'][username] = {'cursors': {'up': false, 'down': false, 'left': true, 'right': false},
        //                             'truning': null, 
        //                             'want2go': null,
        //                             'isDead': false,
        //                             'playerId': 0};
        // currentGameInfo['players'][otherplayer] = {'cursors': {'up': false, 'down': false, 'left': false, 'right': true},
        //                             'truning': null, 
        //                             'want2go': null,
        //                             'isDead': false,
        //                             'playerId': 1};

        this.map = null;
        this.layer = null;
        
        this.numDots = 0;
        this.TOTAL_DOTS = 0;
        this.score = 0;
        this.score1 = 0;
        this.scoreText = null;
        this.scoreText1 = null;
        
        this.pacman = null; 
        this.pacman1 = null;

        this.clyde = null;
        this.pinky = null;
        this.inky = null;
        this.blinky = null;
        this.isInkyOut = false;
        this.isClydeOut = false;
        this.ghosts = [];

        this.safetile = 14;
        this.gridsize = 16;       
        this.threshold = 3;
        
        this.SPECIAL_TILES = [
            { x: 12, y: 11 },
            { x: 15, y: 11 },
            { x: 12, y: 23 },
            { x: 15, y: 23 }
        ];
        
        this.TIME_MODES = [
            {
                mode: "scatter",
                time: 7000
            },
            {
                mode: "chase",
                time: 20000
            },
            {
                mode: "scatter",
                time: 7000
            },
            {
                mode: "chase",
                time: 20000
            },
            {
                mode: "scatter",
                time: 5000
            },
            {
                mode: "chase",
                time: 20000
            },
            {
                mode: "scatter",
                time: 5000
            },
            {
                mode: "chase",
                time: -1 // -1 = infinite
            }
        ];
        this.changeModeTimer = 0;
        this.remainingTime = 0;
        this.currentMode = 0;
        this.isPaused = false;
        this.FRIGHTENED_MODE_TIME = 7000;
        
        this.ORIGINAL_OVERFLOW_ERROR_ON = true;
        this.DEBUG_ON = true;
        
        this.KEY_COOLING_DOWN_TIME = 250;
        this.lastKeyPressed = 0;
    },

    init: function () {

        /*
         socket.on('connect', function(data) {
             socket.emit('addUser', 'nitthilan');
             socket.emit('addGamePlayer', '5665, nitthilan');
         });
         */
        this.resetData();

        console.log("pacman state ", global_game_state, global_local_username)
        for(var key in global_game_state['players']){
            if(global_game_state['players'][key] !== global_local_username)
                this.otherplayer = key;
        }
        pac_socket.emit('updateServerState', global_game_state);
       
        pac_socket.on('updateClientState', (data)=>{
            global_game_state = data;
            //console.log("updateClientState", data);
        });



        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas); // full retro mode, i guess ;)

        this.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function () {
        //  We need this because the assets are on Amazon S3
        //  Remove the next 2 lines if running locally
        //this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue005/';
        //this.load.crossOrigin = 'anonymous';

        this.load.image('dot', 'assets/dot.png');
        this.load.image("pill", "assets/pill16.png");
        this.load.image('tiles', 'assets/pacman-tiles.png');
        this.load.spritesheet('pacman', 'assets/pacman.png', 32, 32);
        this.load.spritesheet('pacman1', 'assets/pacman_red.png', 32, 32);
        this.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
        this.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);

        //  Needless to say, the beast was stoned... and the graphics are Namco (C)opyrighted
    },

    create: function () {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('pacman-tiles', 'tiles');

        this.layer = this.map.createLayer('Pacman');

        this.dots = this.add.physicsGroup();
        this.numDots = this.map.createFromTiles(7, this.safetile, 'dot', this.layer, this.dots);
        this.TOTAL_DOTS = this.numDots;
        
        this.pills = this.add.physicsGroup();
        this.numPills = this.map.createFromTiles(40, this.safetile, "pill", this.layer, this.pills);

        //  The dots will need to be offset by 6px to put them back in the middle of the grid
        this.dots.setAll('x', 6, false, false, 1);
        this.dots.setAll('y', 6, false, false, 1);

        //  Pacman should collide with everything except the safe tile
        this.map.setCollisionByExclusion([this.safetile], true, this.layer);

        // Our hero
        this.pacman = new Pacman(this, "pacman");

        this.pacman1 = new Pacman1(this, "pacman1", this.otherplayer);

        // Score and debug texts
        this.scoreText = game.add.text(8, 272, "Score: " + this.score, { fontSize: "16px", fill: "#fff" });
        this.scoreText1 = game.add.text(375, 272, "Score: " + this.score1, { fontSize: "16px", fill: "#fff" });
        //this.overflowText = game.add.text(375, 280, "", { fontSize: "12px", fill: "#fff" });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors1 = {'up': false, 'down': false,'left': false,'right': false};
        this.cursors["d"] = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.cursors["b"] = this.input.keyboard.addKey(Phaser.Keyboard.B);
        //alert(username+" jdsk");
        //this.game.time.events.add(1250, this.sendExitOrder, this);
        //this.game.time.events.add(7000, this.sendAttackOrder, this);
        //alert(this.TIME_MODES);
        this.changeModeTimer = this.time.time + this.TIME_MODES[this.currentMode].time;
        
        // Ghosts
        this.blinky = new Ghost(this, "ghosts", "blinky", {x:13, y:11}, Phaser.RIGHT);
        this.pinky = new Ghost(this, "ghosts", "pinky", {x:15, y:14}, Phaser.LEFT);
        this.inky = new Ghost(this, "ghosts", "inky", {x:14, y:14}, Phaser.RIGHT);
        this.clyde = new Ghost(this, "ghosts", "clyde", {x:17, y:14}, Phaser.LEFT);
        this.ghosts.push(this.clyde, this.pinky, this.inky, this.blinky);
        
        this.sendExitOrder(this.pinky);
        //game.input.onDown.add(this.restartGame, this);
    },

    checkKeys: function () {
        this.pacman.checkKeys(this.cursors);
        //this.cursors1['right']= true;
        this.pacman1.checkKeys();
        if (this.lastKeyPressed < this.time.time) {
            if (this.cursors.d.isDown) {
                this.DEBUG_ON = (this.DEBUG_ON) ? false : true;
                this.lastKeyPressed = this.time.time + thmis.KEY_COOLING_DOWN_TIME;
            }
            if (this.cursors.b.isDown) {
                this.ORIGINAL_OVERFLOW_ERROR_ON = this.ORIGINAL_OVERFLOW_ERROR_ON ? false : true;
                this.pinky.ORIGINAL_OVERFLOW_ERROR_ON = this.ORIGINAL_OVERFLOW_ERROR_ON;
            }
        }
    },
    
    getActions: function() {

    },

    checkMouse: function() {
        if (this.input.mousePointer.isDown) {            
            var x = this.game.math.snapToFloor(Math.floor(this.input.x), this.gridsize) / this.gridsize;
            var y = this.game.math.snapToFloor(Math.floor(this.input.y), this.gridsize) / this.gridsize;
            this.debugPosition = new Phaser.Point(x * this.gridsize, y * this.gridsize);
            console.log(x, y);
        }
    },
    
    dogEatsDog: function(pacman, ghost, id) {
        //alert(id);
        if (this.isPaused) {
            this[ghost.name].mode = this[ghost.name].RETURNING_HOME;
            this[ghost.name].ghostDestination = new Phaser.Point(14 * this.gridsize, 14 * this.gridsize);
            this[ghost.name].resetSafeTiles();
            if(id == 0)
                this.score += 10;
            else
                this.score1 += 10;
        } else {
            this.killPacman(id);
        }
    },
    
    getCurrentMode: function() {
        if (!this.isPaused) {
            if (this.TIME_MODES[this.currentMode].mode === "scatter") {
                return "scatter";
            } else {
                return "chase";
            }
        } else {
            return "random";
        }
    },
    
    gimeMeExitOrder: function(ghost) {
        this.game.time.events.add(Math.random() * 3000, this.sendExitOrder, this, ghost);
    },
        
    killPacman: function(id) {
        if(id == 0)
            this.pacman.isDead = true;
        else
            this.pacman1.isDead = true;
        if(this.pacman.isDead && this.pacman1.isDead)
            this.stopGhosts();
        
        //game.state.restart();
        //game.state.start('Over');
        //this.game.state.restart();
        //this.restartGame();
    },
    
    stopGhosts: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].mode = this.ghosts[i].STOP;
        }
    },

    update: function () {


        this.scoreText.text = "Score: " + this.score;
        /*
        if (this.DEBUG_ON) {
            this.debugText.text = "Debug ON";
        } else {
            this.debugText.text = "";
        }
        if (this.ORIGINAL_OVERFLOW_ERROR_ON) {
            this.overflowText.text = "Overflow ON";
        } else {
            this.overflowText.text = "";
        }
        */
        if (!this.pacman.isDead || !this.pacman1.isDead) {
            for (var i=0; i<this.ghosts.length; i++) {
                if (this.ghosts[i].mode !== this.ghosts[i].RETURNING_HOME) {
                    if(!this.pacman.isDead)
                        this.physics.arcade.overlap(this.pacman.sprite, 
                            this.ghosts[i].ghost, () => {this.dogEatsDog(this.pacman, this.ghosts[i], 0)}, null, this);
                    if(!this.pacman1.isDead)
                        this.physics.arcade.overlap(this.pacman.sprite, 
                            this.ghosts[i].ghost, () => {this.dogEatsDog(this.pacman1, this.ghosts[i], 1)}, null, this);
                }
            }
            
            if (this.TOTAL_DOTS - this.numDots > 30 && !this.isInkyOut) {
                this.isInkyOut = true;
                this.sendExitOrder(this.inky);
            }
            
            if (this.numDots < this.TOTAL_DOTS/3 && !this.isClydeOut) {
                this.isClydeOut = true;
                this.sendExitOrder(this.clyde);
            }
            

            if (this.changeModeTimer !== -1 && !this.isPaused && this.changeModeTimer < this.time.time) {
                this.currentMode++;
                this.changeModeTimer = this.time.time + this.TIME_MODES[this.currentMode].time;
                if (this.TIME_MODES[this.currentMode].mode === "chase") {
                    this.sendAttackOrder();
                } else {
                    this.sendScatterOrder();
                }
                console.log("new mode:", this.TIME_MODES[this.currentMode].mode, this.TIME_MODES[this.currentMode].time);
            }
            if (this.isPaused && this.changeModeTimer < this.time.time) {
                this.changeModeTimer = this.time.time + this.remainingTime;
                this.isPaused = false;
                if (this.TIME_MODES[this.currentMode].mode === "chase") {
                    this.sendAttackOrder();
                } else {
                    this.sendScatterOrder();
                }
                console.log("new mode:", this.TIME_MODES[this.currentMode].mode, this.TIME_MODES[this.currentMode].time);
            }
        }

        pac_socket.emit('updateServerState', global_game_state);

        if(this.pacman.isDead && this.pacman1.isDead){

            this.game.state.restart();
            this.game.state.start('menu');
            //alert("dead");
            
            //this.create();

            //game.state.start('gameLocal');
        }else{
            this.pacman1.update();
            this.pacman.update();
            this.updateGhosts();




            this.checkKeys();
            this.checkMouse();
        }

    },
    
    enterFrightenedMode: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].enterFrightenedMode();
        }
        if (!this.isPaused) {
            this.remainingTime = this.changeModeTimer - this.time.time;
        }
        this.changeModeTimer = this.time.time + this.FRIGHTENED_MODE_TIME;
        this.isPaused = true;
        console.log(this.remainingTime);
    },
    
    isSpecialTile: function(tile) {
        for (var q=0; q<this.SPECIAL_TILES.length; q++) {
            if (tile.x === this.SPECIAL_TILES[q].x && tile.y === this.SPECIAL_TILES[q].y) {
                return true;
            } 
        }
        return false;
    },
    
    updateGhosts: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].update();
        }
    },

    
    render: function() {
        if (this.DEBUG_ON) {
            for (var i=0; i<this.ghosts.length; i++) {
                var color = "rgba(0, 255, 255, 0.6)";
                switch (this.ghosts[i].name) {
                    case "blinky":
                        color = "rgba(255, 0, 0, 0.6";
                        break;
                    case "pinky":
                        color = "rgba(255, 105, 180, 0.6";
                        break;
                    case "clyde":
                        color = "rgba(255, 165, 0, 0.6";
                        break;
                }
                if (this.ghosts[i].ghostDestination) {
                    var x = this.game.math.snapToFloor(Math.floor(this.ghosts[i].ghostDestination.x), this.gridsize);
                    var y = this.game.math.snapToFloor(Math.floor(this.ghosts[i].ghostDestination.y), this.gridsize);
                    this.game.debug.geom(new Phaser.Rectangle(x, y, 16, 16), color);
                }
            }
            if (this.debugPosition) {
                this.game.debug.geom(new Phaser.Rectangle(this.debugPosition.x, this.debugPosition.y, 16, 16), "#00ff00");
            }
        } else {
            this.game.debug.reset();
        }
    },
    
    sendAttackOrder: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].attack();
        }
    },
    
    sendExitOrder: function(ghost) {
        ghost.mode = this.clyde.EXIT_HOME;
        //this.state.start("menu");
    },
    
    sendScatterOrder: function() {
        for (var i=0; i<this.ghosts.length; i++) {
            this.ghosts[i].scatter();
        }
    }
};


//game.state.add('gameLocal', PacmanGame);
//game.state.add('menu', menu);
//game.state.start('gameLocal');
