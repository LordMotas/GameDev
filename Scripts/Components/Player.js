//------------------------------------------------------------------
//
// Defines a player character.  'spec' is defined as:
//	{
//		center: {x, y},
//		img: Texture,
//		size: {width, height},
//		moveRate:,
//		direction: {x:0, y:0}
//	}
//
//------------------------------------------------------------------
Game.components.Player = function(spec){

	var sprite = null,
			graze = null,
			focus1 = null,
			death = null,
			bulletArray = [],
			bombActive = false,
			bomb = {},
			isInvulnerable = false,
			that = {
				get center() { return entity.sprite.center; },
				get sprite() { return entity.sprite; },
				get graze() { return graze; },
				get isFocused() { return spec.isFocused; },
				get radius() { return spec.radius; },
				get focus1() { return focus1; },
				get bullets() { return bulletArray; },
				get bombActive() { return bombActive; },
				get bomb() { return bomb; },
				set bomb(value){ bomb = value; },
				get isInvulnerable() { return isInvulnerable; },
				set isInvulnerable(value) { isInvulnerable = value; },
				get playerLives() { return playerLives; }
			};

	//Inherits character info
	var entity = Game.components.Entity(spec);
	var graze = Game.components.Entity({
		center: {
			x: spec.center.x,
			y: spec.center.y
		},
		direction: {
			x: spec.direction.x,
			y: spec.direction.y
		},
		radius: .03
	});

	that.intersects = function(other){
		return(entity.intersects(other));
	}

	that.graze = function(other){
		return(graze.intersects(other));
	}

	//Movement patterns for main player
	that.moveLeft = function(elapsedTime) {
		if(entity.sprite.spriteSheet !== Game.assets['animated-byakuren-left']){
			entity.sprite.spriteSheet = Game.assets['animated-byakuren-left'];
		}

		if((spec.center.x - spec.moveRate * (elapsedTime / 1000)) - 0.045 > 0.0){
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveRight = function(elapsedTime) {
		if(entity.sprite.spriteSheet !== Game.assets['animated-byakuren-right']){
			entity.sprite.spriteSheet = Game.assets['animated-byakuren-right'];
		}
		if((spec.center.x + spec.moveRate * (elapsedTime / 1000)) + 0.045 < 1.0){
			spec.center.x += spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveUp = function(elapsedTime) {
		if((spec.center.y - spec.moveRate * (elapsedTime / 1000)) - 0.03 > 0.0){
			spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveDown = function(elapsedTime) {
		if((spec.center.y + spec.moveRate * (elapsedTime / 1000)) + 0.045 < 1.0){
		spec.center.y += spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.playerFire = function(elapsedTime){
		var bullet;
		//Create the positions of the bullets and their respective
		Game.music.playRepeatedSounds('Audio/se_shot');
		var bulletSet = [];
		if(spec.isFocused){
			if(powerLevel >= 0.0){
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x + 0.01, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x - 0.01, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 1.0){
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x + 0.02, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x - 0.02, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 2.0){
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x + 0.03, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x - 0.03, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 3.0){
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x + 0.04, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x - 0.04, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 4.0){
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x + 0.05, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : 0.0, y : -0.75},
					center : {x : spec.center.x - 0.05, y : spec.center.y - 0.05}
				});
			}
		} else {
			if(powerLevel >= 0.0){
				bulletSet.push({
					direction : {x : 0, y : -0.75},
					center : {x : spec.center.x + 0.01, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : 0, y : -0.75},
					center : {x : spec.center.x - 0.01, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 1.0){
				bulletSet.push({
					direction : {x : 0.05, y : -0.75},
					center : {x : spec.center.x + 0.02, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : -0.05, y : -0.75},
					center : {x : spec.center.x - 0.02, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 2.0){
				bulletSet.push({
					direction : {x : 0.10, y : -0.75},
					center : {x : spec.center.x + 0.03, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : -0.10, y : -0.75},
					center : {x : spec.center.x - 0.03, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 3.0){
				bulletSet.push({
					direction : {x : 0.15, y : -0.75},
					center : {x : spec.center.x + 0.04, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : -0.15, y : -0.75},
					center : {x : spec.center.x - 0.04, y : spec.center.y - 0.05}
				});
			}
			if(powerLevel >= 4.0){
				bulletSet.push({
					direction : {x : 0.20, y : -0.75},
					center : {x : spec.center.x + 0.05, y : spec.center.y - 0.05}
				});
				bulletSet.push({
					direction : {x : -0.20, y : -0.75},
					center : {x : spec.center.x - 0.05, y : spec.center.y - 0.05}
				});
			}
		}
		for(var index in bulletSet){
			bullet = Game.components.Bullet({
				direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
				center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
				radius: .005,
				sprite: Game.components.AnimatedSprite({
					spriteSheet: Game.assets['animated-player-bullet'],
					spriteCount: 12,
					spriteTime: [125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125],
					animationScale: spec.animationScale,
					spriteSize: {width: 0.05, height: 0.05},			// Maintain the size on the sprite
					spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
					})
			});
			bullet.isAnimated = true;
			bulletArray.push(bullet);
		}
	}

	that.playerBomb = function(elapsedTime){
		if(!bombActive){
			if(powerLevel >= 1.0){
				powerLevel -= 1.0;
				bomb = Game.components.Entity(spec);
				bomb.radius = 0.005;
				bomb.center = spec.center;

				focus1.isAnimated = true;
				bombActive = true;
				isInvulnerable = true;
				setTimeout(function(){bombActive = false; isInvulnerable = false;}, 3000);
			} else {
				console.log("Player doesn't have enough power to do so");
			}
		}
	}

	that.playerFocus = function(elapsedTime, focusKey){
		spec.isFocused = true;
		spec.moveRate = 275 / 1000;
		window.addEventListener('keyup', function focus(event) {
			window.removeEventListener('keyup', focus, false);
			if(event.keyCode === focusKey){
				spec.moveRate = 550 / 1000;
				spec.isFocused = false;
			}
		}, false);
	}

	that.update = function(elapsedTime){
		var previousX = spec.center.x,
				previousY = spec.center.y;
		entity.sprite.update(elapsedTime, true);
		entity.sprite.center = spec.center;
		entity.update(elapsedTime);
		graze.center = spec.center;
		focus1.update(elapsedTime, true);
		focus1.center = spec.center;
		if(bombActive){
			bomb.updateBomb(elapsedTime);
		} else {
			bomb = Game.components.Entity(spec);
			bomb.resetBomb(elapsedTime);
		}
		if(previousX === spec.center.x && previousY === spec.center.y){
			if(entity.sprite.spriteSheet !== Game.assets['animated-byakuren-standard']){
				entity.sprite.spriteSheet = Game.assets['animated-byakuren-standard'];
			}
		}
	}

	that.deathAnimation = function(){
		//Sound effect here

		//Play the animation particle thing

		//Remove the player sprite from the board
		entity.center = {x: 500, y: 500};
		entity.sprite.center = {x: 500, y: 500};
		setTimeout(function(){entity.center = {x: 0.5, y: 0.95};entity.sprite.center = {x: 0.5, y: 0.95};}, 1000);
		//After one second, place the player back in the original position

		//Do something to show that you're invincible for a few frames

	}

	entity.sprite = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['animated-byakuren-standard'],
		spriteCount: 8,
		spriteTime: [125, 125, 125, 125, 125, 125, 125, 125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	entity.sprite.isAnimated = true;

	focus1 = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['focus1'],
		spriteCount: 8,
		spriteTime: [125, 125, 125, 125, 125, 125, 125, 125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	//Attempt to implement particle effect when player dies,
	//but I think this would only make a single particle as a sprite
	//in place of the player
	death = Game.components.AnimatedSprite



	focus1.isAnimated = true;

	return that;
};
