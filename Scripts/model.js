// This namespace holds the Game model.
Game.model = (function(music, components){
	'use strict';

	//Variables for the game model go here
	var that = {};
	var player = null;
	var background = {};
	var enemyQueue;
	var enemyQueueInterval;
	var enemyQueueTimeFrame;
	var enemyActive;
	var enemyBullets;
	var playerBullets;
	var items;
	var score;
	var grazeScore;
	var particleSystem;

	//This function initializes the Game model
	that.initialize = function(){
		console.log("Now initializing the game model...");

		background.image = new Image();
		background.image.isReady = false;
		background.image.src = '/Images/background.png';//Game.assets['background'];
		background.image.onload = function(){
			background.image.isReady = true;
		};
		background.y = -512;
		background.speed = 1;

		//Initializes the player info
		player = components.Player({
			size: {width: 0.1, height: 0.1},
			center: {x: 0.5, y: 0.95},
			moveRate: 550 / 1000, //World units per second
			isFocused: false,
			direction: {x:0, y:0},
			bombActive: false,
			radius: 0.005,
			particleType: 1
		});

		enemyActive = [];
		enemyQueue = [];
		enemyQueueInterval = 12000;
		enemyQueueTimeFrame = 9000;
		enemyBullets = [];
		playerBullets = [];
		items = [];
		score = 0;
		grazeScore = 0;

		// Generates the 2D array of enemies to pull from
		// during the game
		for(var i = 0; i < 5; i++){
			enemyQueue[i] = [];
			for(var j = 0; j < 4; j++){
				if(i === 0 || i === 3){
					enemyQueue[i].push(components.Enemy({
						center: {x: j/10 + .1, y: -0.2},
						size: {width:0.075, height:0.075},
						direction: {x:0, y:0.02*j + .04},
						radius: .035,
						bulletPatternType: 1,
						movePatternType: 1,
						health: 10,
						points: 500,
						timeStamp: performance.now(),
						interval: 750,
						waitTime: 1000,
						itemType: 1,
						particleType: 2
					}));
				} else if(i === 1 || i === 2){
					enemyQueue[i].push(components.Enemy({
						center: {x: .01*j + .1, y: j/6 - 1},
						size: {width:0.075, height:0.075},
						direction: {x:0, y:0.01*i + .01},
						radius: .035,
						bulletPatternType: 2,
						movePatternType: 2,
						health: 10,
						points: 500,
						timeStamp: performance.now(),
						interval: 750,
						waitTime: 500,
						itemType: 2,
						particleType: 2
					}));
				}
			}
		}

		console.log(Game.assets['particle-fire']);
		particleSystem = Game.components.ParticleSystem({
			image : {
				player : '/Images/Bullets/Circles/YellowCircle.png',
				enemy : '/Images/Bullets/Circles/BlueCircle.png',
				bullet : '/Images/Particles/smoke.png'
			},
			center: {x: .5, y: .5},
			speed: {mean: .05, stdev: .01},
			lifetime: {mean: 4, stdev: 1}
		}, Game.renderer.core);


		//Allow the main program to render and update the model
		modelInitialized = true;
	};


	that.score = function(){
		return score;
	}

	that.grazeScore = function(){
		return grazeScore;
	}

	function gameOver(){
		return (playerLives === 0);
	}

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		player.update(elapsedTime);
		//Idea for looping backwards:
		// http://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
		for(var bullet = player.bullets.length - 1; bullet >= 0; bullet--){
			if(player.bullets[bullet] == undefined){
				console.log("here it is...");
			}
			playerBullets.push(player.bullets[bullet]);
			player.bullets.splice(bullet, 1);
		}

		//Checks the time frame vs the interval and if enough time has passed, the next round of enemies come in
		enemyQueueTimeFrame += elapsedTime;
		if(enemyQueueTimeFrame >= enemyQueueInterval && enemyQueue[0]){
			enemyQueueTimeFrame = 0;
			//if we wanted a variable timeFrame, we can add if statements like:
			/*
			if(enemyQueue.length < 3){
				enemyQueueInterval = 10000;
			}
			*/

			for(var i = 0; i < enemyQueue[0].length; i++){
				enemyActive.push(enemyQueue[0][i]);
			}
			enemyQueue.splice(0,1);
		}

		//Updates enemy states
		//Also, continues if enemy is spliced out so it doesn't look for a null enemy
		for(var enemy = 0; enemy < enemyActive.length; enemy++){
			if(enemyActive[enemy].update(elapsedTime)){
				if(enemyActive[enemy].health === 0){
					score += enemyActive[enemy].points;
					particleSystem.create(enemyActive[enemy]);
					//console.log(score);
				}
				enemyActive.splice(enemy, 1);
				continue;
			}
			if(enemyActive[enemy].intersects(player) && !player.isInvulnerable){
				//console.log("player hit an enemy");
				//Player death sound
				playerLives--;
			}
			if(enemyActive[enemy].intersects(player.bomb)){
				enemyActive[enemy].hit();
			}
			//Passes all the enemy bullets for each enemy into one array of enemy bullets
			for(var bullet = enemyActive[enemy].bullets.length - 1; bullet >= 0; bullet--){
				if(enemyActive[enemy].bullets){
					enemyBullets.push(enemyActive[enemy].bullets[bullet]);
					enemyActive[enemy].bullets.splice(bullet,1)
					continue;
				}
			}
			for(var bullet = enemyBullets.length - 1; bullet >= 0; bullet--){
				if(enemyBullets[bullet].intersects(player) && !player.isInvulnerable){
					//console.log("bullet hit player");
					//Player death sound
					particleSystem.create(enemyBullets[bullet]);
					enemyBullets.splice(bullet, 1);
					playerLives--;
					player.isInvulnerable = true;
					//Test of the particle system
					particleSystem.create(player);
					player.deathAnimation();
					setTimeout(function(){player.isInvulnerable = false;}, 4000);
					if(gameOver()){
						console.log("GAME OVER");
						//Do a function here that alerts to the game over
					}
					continue;
				}
				if(enemyBullets[bullet].isGraze && enemyBullets[bullet].intersects(player.graze)){
					enemyBullets[bullet].isGraze = false;
					grazeScore++;
					//console.log("Grazing", grazeScore);
				}
				if(enemyBullets[bullet].intersects(player.bomb)){
					//console.log("bomb hits bullets");
					enemyBullets.splice(bullet, 1);
					continue;
				}
			}
		}
		//Checks each enemy bullet for going off screen or colliding with player
		for(var bullet = enemyBullets.length - 1; bullet >= 0; bullet--){
			if(enemyBullets[bullet].intersects(player) && !player.isInvulnerable){
				console.log("bullet hit player");
				playerLives--;
				player.isInvulnerable = true;
				particleSystem.create(player);
				player.deathAnimation();
				enemyBullets.splice(bullet, 1);
				setTimeout(function(){player.isInvulnerable = false;}, 4000);
				if(gameOver()){
					console.log("GAME OVER");
					//Do something here that alerts about the game over
				}
				continue;
			}
			if(enemyBullets[bullet].update(elapsedTime)){
				enemyBullets.splice(bullet, 1);
				continue;
			}
		}

		//Checks each player bullet for going off screen or colliding with an enemy
		for(var bullet = playerBullets.length - 1; bullet >= 0; bullet--){
			for(var enemy = enemyActive.length - 1; enemy >= 0; enemy--){
				if(playerBullets[bullet] === undefined){
					break;
					console.log(bullet, "here it is...");
				}
				if(playerBullets[bullet].intersects(enemyActive[enemy])){ //Gives a weird error here sometimes where the player
					//bullet is no longer defined and so it doesn't read its intersect function
					//console.log("bullet hit enemy");
					particleSystem.create(player.bullets[bullet]);
					player.bullets.splice(bullet, 1);
					enemyActive[enemy].hit();
					score += 50;
					playerBullets.splice(bullet, 1);
					//console.log(enemy, enemyActive[enemy].health);
				}
			}
			if(playerBullets[bullet].update(elapsedTime)){
				playerBullets.splice(bullet, 1);
				//console.log(bullet, "Spliced and diced");
				continue;
			}
		}
		particleSystem.update(elapsedTime);
	};

	//This function renders the Game model
	that.render = function(renderer){
		renderer.core.drawBackground(background);
		renderer.Player.render(player);
		for(var bullet = 0; bullet < playerBullets.length; bullet++){
			renderer.Bullet.render(playerBullets[bullet]);
		}
		for(var enemy = 0; enemy < enemyActive.length; enemy++){
			renderer.Entity.render(enemyActive[enemy]);
		}
		for(var bullet = 0; bullet < enemyBullets.length; bullet++){
			renderer.Bullet.render(enemyBullets[bullet]);
		}
		particleSystem.render();
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
