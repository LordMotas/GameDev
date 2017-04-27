// This namespace holds the Game model.
Game.model = (function(music, components){
	'use strict';

	var player = null;
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
	var highScoreArray;
	var quadTree = null;
	var quadTreeCriteria = 40;

	//Variables for the game model go here
	var that = {
		get highScoreArray() { return highScoreArray; },
		get enemyQueueLength() { return enemyQueue.length; },
		get enemyActiveLength() { return enemyActive.length; },
		get quadTreeCriteria() { return quadTreeCriteria; },
	};

	//This function initializes the Game model
	that.initialize = function(){
		console.log("Now initializing the game model...");

		var storedHighScoreArray = JSON.parse(localStorage.getItem('highScores'));

		if(storedHighScoreArray === null){
			highScoreArray = [
				{name: 'Motas-----', score: 5000000},
				{name: 'Motas-----', score: 4000000},
				{name: 'Motas-----', score: 3000000},
				{name: 'Motas-----', score: 2000000},
				{name: 'Motas-----', score: 1000000}
			];
		}else{
			highScoreArray = storedHighScoreArray;
		}

		highScoreArray = [
			{name: 'Motas-----', score: 5000000},
			{name: 'Motas-----', score: 4000000},
			{name: 'Motas-----', score: 3000000},
			{name: 'Motas-----', score: 2000000},
			{name: 'Motas-----', score: 1000000}
		];

		background.image = new Image();
		background.image.isReady = false;
		background.image.src = '/Images/background.png';
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
			particleType: 1
			radius: 0.003,
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
		for(var i = 0; i < 0; i++){
			enemyQueue[i] = [];
			for(var j = 0; j < 0; j++){
				if(i === 0 || i === 3){
					enemyQueue[i].push(components.Enemy({
						center: {x: j/10 + .1, y: -0.2},
						img : Game.assets['animated-enemy-red'],
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
						isBoss : false,
					}));
				} else if(i === 1 || i === 2){
					enemyQueue[i].push(components.Enemy({
						center: {x: .01*j + .1, y: j/6 - 1},
						img : Game.assets['animated-enemy-blue'],
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
						isBoss : false,
					}));
				}
			}
		}
		//Put the boss into the queue
		enemyQueue[0] = [];
		enemyQueue[0].push(components.Enemy({
			center: {x: 0.5, y: -0.05},
			img : Game.assets['animated-mokou'],
			size: {width:0.1, height:0.1},
			direction: {x:0, y:0.1},
			radius: 0.05,
			bulletPatternType: 4,
			movePatternType: 3,
			health: 500,
			points: 1000000,
			timeStamp: performance.now(),
			interval: 1000,
			waitTime: 5000,
			isBoss : true,
			func : function(){music.resetMusic('Audio/mainBGM'); music.playMusic('Audio/bossBGM')}
		}));

<<<<<<< HEAD
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


		powerLevel = 0.0;
=======
		powerLevel = 3.0;
>>>>>>> Boss patterns finished and victory screen
		pointLevel = 0;
		setScore(0);
		setGraze(0);
		playerLives = 3;
		extendArray = [50, 125, 250, 300, 450];
		extendIterator = 0;
		//Allow the main program to render and update the model
		modelInitialized = true;

		buildQuadTree();
	};

	function setBackground(newImage){
		background.src = newImage;
	}

	function buildQuadTree() {
		var enemy = 0;
		var enemyBullet = 0;
		var playerBullet = 0;

		//Insert things into the quad tree
		quadTree = components.QuadTree(quadTreeCriteria);
		//Put in the player
		quadTree.insert(player);
		for(enemyBullet = 0; enemyBullet < enemyBullets.length; enemyBullet++){
			quadTree.insert(enemyBullets[enemyBullet]);
		}
	}

	that.score = function(){
		return score;
	}

	that.setScore = function(value){
		score = value;
	}

	that.grazeScore = function(){
		return grazeScore;
	}

	that.setGraze = function(value){
		grazeScore = value;
	}

	function setGraze(value){
		grazeScore = value;
	}

	function setScore(value){
		score = value;
	}

	function gameOver(){
		return (playerLives === 0);
	}

	function decision(e1, e2) {
		if(e1.isPlayer && e2.isBullet)
			return true;
		else
			return false;
	}

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		var other = null,
				enemyBullet = 0;

		buildQuadTree();

		//Player is hit by bullet
		for(enemyBullet = 0; enemyBullet < enemyBullets.length; enemyBullet++){
			other = quadTree.intersects(enemyBullets[enemyBullet]);
			if (other) {
				if(decision(enemyBullets[enemyBullet], other)){
					if(!player.isInvulnerable){
						playerLives--;
						player.isInvulnerable = true;
						enemyBullets.splice(bullet, 1);
						if(gameOver()){
							player.deathAnimation();
							setTimeout(function(){player.isInvulnerable = false;}, 4000);
							if(checkHighScore()){
								enterHighScore();
							}
						} else {
							player.deathAnimation();
							setTimeout(function(){player.isInvulnerable = false;}, 4000);
						}
						continue;
					}
				}
			}
		}

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

			for(var i = 0; i < enemyQueue[0].length; i++){
				enemyActive.push(enemyQueue[0][i]);
				if(enemyQueue[0][i].hasOwnProperty('func') && enemyQueue[0][i].func !== undefined){
					enemyQueue[0][i].func();
				}
			}
			enemyQueue.splice(0,1);
		}

		//Updates enemy states
		//Also, continues if enemy is spliced out so it doesn't look for a null enemy
		for(var enemy = 0; enemy < enemyActive.length; enemy++){
			if(enemyActive[enemy].update(elapsedTime)){
				if(enemyActive[enemy].health <= 0){
					score += enemyActive[enemy].points;
					particleSystem.create(enemyActive[enemy]);
					//console.log(score);
					//Drop the item
					switch(enemyActive[enemy].itemType){
						case 1:
						for(var i = 0; i < Random.nextRange(3,6); i++){
							items.push(Game.components.Item({
								center: {x: enemyActive[enemy].center.x, y: enemyActive[enemy].center.y},
								size: {width:0.035, height:0.035},
								value : 0.05,
								direction:  {x: Random.nextGaussian(0, 0.15), y: Random.nextGaussian(-0.07, 0.07)},
								radius: 0.03,
								img: Game.assets['power-small'],
								itemType : 1,
							}));
						}
							break;
						case 2:
							for(var i = 0; i < Random.nextRange(3,6); i++){
								items.push(Game.components.Item({
									center: {x: enemyActive[enemy].center.x, y: enemyActive[enemy].center.y},
									size: {width:0.035, height:0.035},
									value : 0.05,
									direction:  {x: Random.nextGaussian(0, 0.15), y: Random.nextGaussian(-0.07, 0.07)},
									radius: 0.03,
									img: Game.assets['point'],
									itemType : 2,
								}));
							}
							break;
						case 3:
						for(var i = 0; i < Random.nextRange(3,6); i++){
							items.push(Game.components.Item({
								center: {x: enemyActive[enemy].center.x, y: enemyActive[enemy].center.y},
								size: {width:0.035, height:0.035},
								value : 0.5,
								direction:  {x: Random.nextGaussian(0, 0.15), y: Random.nextGaussian(-0.07, 0.07)},
								radius: 0.03,
								img: Game.assets['power-large'],
								itemType : 3,
							}));
						}
						break;
						default:
							break;
					}
				}
				enemyActive.splice(enemy, 1);
				continue;
			}
			if(enemyActive[enemy].intersects(player) && !player.isInvulnerable){
				//console.log("player hit an enemy");
				playerLives--;
				player.isInvulnerable = true;
				if(gameOver()){
					//Do a function here that alerts to the game over
					player.deathAnimation();
					setTimeout(function(){player.isInvulnerable = false;}, 4000);
					if(checkHighScore()){
						enterHighScore();
					}
				} else {
					player.deathAnimation();
					setTimeout(function(){player.isInvulnerable = false;}, 4000);
				}
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
						player.deathAnimation();
						setTimeout(function(){player.isInvulnerable = false;}, 4000);
						if(checkHighScore()){
							enterHighScore();
						}
					} else {
						player.deathAnimation();
						setTimeout(function(){player.isInvulnerable = false;}, 4000);
					}
					continue;
				}
				if(enemyBullets[bullet].isGraze && enemyBullets[bullet].intersects(player.graze)){
					enemyBullets[bullet].isGraze = false;
					music.playRepeatedSounds('Audio/se_graze');
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

		//Checks each enemy bullet for going off screen
		for(var bullet = enemyBullets.length - 1; bullet >= 0; bullet--){
			if(enemyBullets[bullet].update(elapsedTime)){
				enemyBullets.splice(bullet, 1);
				continue;
			}
		}

		//Checks each player bullet for going off screen or colliding with an enemy
		for(var bullet = playerBullets.length - 1; bullet >= 0; bullet--){
			for(var enemy = enemyActive.length - 1; enemy >= 0; enemy--){
				if(playerBullets[bullet] !== undefined){
					if(playerBullets[bullet].intersects(enemyActive[enemy])){
            particleSystem.create(player.bullets[bullet]);
						enemyActive[enemy].hit();
						score += 100;
						playerBullets.splice(bullet, 1);
						//console.log(enemy, enemyActive[enemy].health);
					}
				}
			}
		}

		//Update items array
		for(var item = items.length - 1; item >= 0; item--){
			if(items[item].intersects(player.graze)){
				if(powerLevel < 4.0 && (items[item].itemType === 1 || items[item].itemType === 3)){
					var prevPowerLevel = powerLevel;
					powerLevel += items[item].value;
					if(powerLevel > 4.0){
						powerLevel = 4.0;
					}
					if((prevPowerLevel < 1.0 && powerLevel >= 1.0) || (prevPowerLevel < 2.0 && powerLevel >= 2.0) ||
					(prevPowerLevel < 3.0 && powerLevel >= 3.0) || (prevPowerLevel < 4.0 && powerLevel >= 4.0)){
						music.playSound('Audio/se_powerup');
					}
				} else {
					pointLevel += 1;
				}
				music.playRepeatedSounds('Audio/se_item00');
				items.splice(item, 1);
				continue;
			}
			if(items[item].update(elapsedTime)){
				items.splice(item, 1);
				continue;
			}
			if(playerBullets[bullet].update(elapsedTime)){
				playerBullets.splice(bullet, 1);
				//console.log(bullet, "Spliced and diced");
				continue;
			}
		}
		particleSystem.update(elapsedTime);
	};

	function checkHighScore(){
		for(var i = 0; i < highScoreArray.length; i++){
			if(score > highScoreArray[i].score)
				return true;
		}
		return false;
	}

	function enterHighScore(){
		var playerName = prompt("You had a great run! Enter your name (Up to 10 characters)");
		var highScoreEntry = {name : String(playerName + "----------").slice(0,10), score : score};
		//Loop through and place it where it goes
		for(var i = 0; i < highScoreArray.length; i++){
			if(highScoreEntry.score > highScoreArray[i].score){
				var temp = highScoreArray[i];
				highScoreArray[i] = highScoreEntry;
				highScoreEntry = temp;
			}
		}
		localStorage.setItem("highScores", JSON.stringify(highScoreArray));
	}

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
		for(var item = 0; item < items.length; item++){
			renderer.Entity.render(items[item]);
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
