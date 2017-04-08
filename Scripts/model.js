// This namespace holds the Game model.
Game.model = (function(music){
	'use strict';

	//Variables for the game model go here
	var that = {};
	var player;
	var enemyQueue[];
	var enemyActive[];
	var enemyBullets[];
	var playerBullets[];
	//var canvas = document.getElementById('canvas-main');

	//This function initializes the Game model
	that.initialize = function(){
		console.log("Now initializing the game model...");
		//Initializes the player info
		player = Game.components.Player({
			center: {100, 100},
			direction:  {0, 0},
			radius: 15,
			img: //add a Texture here
		});

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
				center: {i*15, 10},
				direction: {0,5},
				radius: 20,
				patternType: 1
			});

		}


	};

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		player.update(elapsedTime);
		for(enemy in enemyActive){
			enemy.update(elapsedTime);
		}
	};

	//This function renders the Game model
	that.render = function(renderer){

	};

	that.pauseGame = function(){
		//Audio sound for pausing the game
		music.playSound('Audio/se_pause');
	}

	return that;

}(Game.music));
