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
			focus1 = null,
			bulletArray = [];
			that = {
				get center() { return entity.sprite.center; },
				get sprite() { return entity.sprite; },
				get isFocused() { return spec.isFocused; },
				get radius() { return spec.radius; },
				get focus1() { return focus1; },
				get bullets() { return bulletArray; },
			};
	powerLevel = 4.0;
	playerLives = 3;

	//Inherits character info
	var entity = Game.components.Entity(spec);

	that.intersects = function(other){
		return(entity.intersects(other))
	}

	//Use later
	//var pattern = Game.components.PlayerBulletPattern(spec);

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
		if(powerLevel >= 1.0){
			console.log("Activate a bomb from the player");
			powerLevel -= 1.0;
			//Create the bomb here and begin doing the rendering
		} else {
			console.log("Player doesn't have enough power to do so");
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
		//entity.update(elapsedTime);
		var previousX = spec.center.x,
				previousY = spec.center.y;
		entity.sprite.update(elapsedTime, true);
		entity.update(elapsedTime);
		focus1.update(elapsedTime, true);
		if(spec.bombActive){
			spec.bomb.updateBomb(elapsedTime);
		}
		if(previousX === spec.center.x && previousY === spec.center.y){
			if(entity.sprite.spriteSheet !== Game.assets['animated-byakuren-standard']){
				entity.sprite.spriteSheet = Game.assets['animated-byakuren-standard'];
			}
		}

		//Eventually include update to bullet stuff
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

	focus1.isAnimated = true;

	return that;
};
