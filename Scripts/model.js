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
				center: {x:0.2*i, y:0.1},
				size: {w:0.1, h:0.1},
				direction: {x:0, y:5},
				radius: 20,
				patternType: 1
			});
				// direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
				// center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
				// sprite: Game.components.AnimatedSprite({
				// 	spriteSheet: Game.assets['animated-player-bullet'],
				// 	spriteCount: 12,
				// 	spriteTime: [125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125],
				// 	animationScale: spec.animationScale,
				// 	spriteSize: {width: 0.05, height: 0.05},			// Maintain the size on the sprite
				// 	spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
				// 	})
		}

		//Allow the main program to render and update the model
		modelInitialized = true;
	};

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		player.update(elapsedTime);
		for(var enemy in enemyActive){
			enemyActive[enemy].update(elapsedTime);
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
