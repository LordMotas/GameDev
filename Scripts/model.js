// This namespace holds the Game model.
Game.model = (function(music, components){
	'use strict';

	//Variables for the game model go here
	var that = {};
	var player = null;
	var enemyQueue;
	var enemyActive;
	var enemyBullets;
	var playerBullets;

	//This function initializes the Game model
	that.initialize = function(){
		console.log("Now initializing the game model...");

		//Initializes the player info
		player = components.Player({
			size: {width: 0.1, height: 0.1},
			center: {x: 0.5, y: 0.95},
			moveRate: 550 / 1000, //World units per second
			isFocused: false,
			direction: {x:0, y:0}
		});

		enemyActive = [];
		enemyQueue = [];
		enemyBullets = [];
		playerBullets = [];


		//Generates the 2D array of enemies to pull from
		//during the game
		// for(var i = 0; i < 5; i++){
		// 	enemyQueue[i] = [];
		// 	for(var j = 0; j < 5; j++){
		// 		enemyQueue[i][j] = Game.components.Enemy({
		// 			center: {j*15, 10},
		// 			direction:  {0, 5},
		// 			radius: 20,
		// 			//img: add a Texture here
		// 			// bullet: {
		// 			// 	rotation: ,
		// 			// 	center: {x, y},
		// 			// 	(add more later)
		// 			// },
		// 			patternType: 1
		// 		});
		// 	}
		// }
		for(var i = 0; i < 5; i++){
			enemyActive[i] = components.Enemy({
				center: {x:0.2*i + .1, y:0.1},
				size: {width:0.075, height:0.075},
				direction: {x:0, y:0.02*i + .02},
				radius: 20,
				bulletPatternType: 1,
				movePatternType: 1,
				health: 1,
				timeStamp: performance.now(),
				interval: 250
			});
		}

		for(var i = 0; i < 4; i++){
			enemyActive.push(components.Enemy({
				center: {x:0.1*i + .1, y:0.2},
				size: {width:0.075, height:0.075},
				direction: {x:0, y:0.01*i + .01},
				radius: 20,
				bulletPatternType: 2,
				movePatternType: 1,
				health: 1,
				timeStamp: performance.now(),
				interval: 500
			}));
		}

		//Allow the main program to render and update the model
		modelInitialized = true;
	};

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		player.update(elapsedTime);
		//Updates enemy state and their bullets (hopefully will change this soon
		//so that it uses a more broad array for all the enemy bullets)
		//Also, continues if enemy is spliced out so it doesn't look for a null enemy
		for(var enemy in enemyActive){
			if(enemyActive[enemy].update(elapsedTime)){
				enemyActive.splice(enemy, 1);
				continue;
			}
			//Checks each enemy bullet for going off screen
			for(var bullet in enemyActive[enemy].bullets){
				if(enemyActive[enemy].bullets[bullet].update(elapsedTime)){
					enemyActive[enemy].bullets.splice(bullet, 1);
				}
			}
		}
		for(var bullet in player.bullets){
			if(player.bullets[bullet].update(elapsedTime)){
				player.bullets.splice(bullet, 1);
			}
		}
	};

	//This function renders the Game model
	that.render = function(renderer){
		renderer.Player.render(player);
		for(var bullet in player.bullets){
			renderer.Bullet.render(player.bullets[bullet]);
		}
		for(var enemy in enemyActive){
			renderer.Entity.render(enemyActive[enemy]);
			for(var bullet in enemyActive[enemy].bullets){
				renderer.Bullet.render(enemyActive[enemy].bullets[bullet]);
			}
		}
	};

	that.moveLeft = function(elapsedTime){
		player.moveLeft(elapsedTime);
	}

	that.moveRight = function(elapsedTime){
		player.moveRight(elapsedTime);
	}

	that.moveUp = function(elapsedTime){
		player.moveUp(elapsedTime);
	}

	that.moveDown = function(elapsedTime){
		player.moveDown(elapsedTime);
	}

	that.playerFire = function(elapsedTime){
		player.playerFire(elapsedTime);
	}

	that.playerBomb = function(elapsedTime){
		player.playerBomb(elapsedTime);
	}

	that.playerFocus = function(elapsedTime, focusKey){
		player.playerFocus(elapsedTime, focusKey);
	}

	that.pauseGame = function(){
		//Audio sound for pausing the game
		music.playSound('Audio/se_pause');
		cancelNextRequest = true;
	}

	return that;

}(Game.music, Game.components));
