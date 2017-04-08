// This namespace holds the Game model.
Game.model = (function(music){
	'use strict';

	//Variables for the game model go here
	var that = {};
	var player,
		playerRenderer,
		enemyQueue,
		enemyActive,
		enemyBullets,
		playerBullets;

	//This function initializes the Game model
	that.initialize = function(){
		console.log("Now initializing the game model...");
		//Initializes the player info
		player = Game.components.Player({
			center: {x: 100, y: 100},
			direction:  {x: 0, y: 0},
			radius: 15,
			img: {}//add a Texture here
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
			enemyActive[i] = Game.components.Enemy({
				center: {x: i*15, y: 10},
				direction: {x: 0, y: 5},
				radius: 20,
				patternType: 1
			});

		}


	};

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		player.update(elapsedTime);
		for(var enemy in enemyActive){
			enemyActive[enemy].update(elapsedTime);
		}
	};

	//This function renders the Game model
	that.render = function(renderer){
		
	};

	that.pauseGame = function(){
		//Audio sound for pausing the game
		music.playSound('Audio/se_pause');
		cancelNextRequest = true;
	}

	return that;

}(Game.music));
