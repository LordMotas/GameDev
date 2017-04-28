//------------------------------------------------------------------
//
// Defines an enemy.  'spec' is defined as:
//	{
//		center: {x, y},
//		direction:  {x, y},
//		radius: ,
//		img: Texture,
//		bullet: {
//			rotation: ,
//			center: {x, y},
//			(add more later)
//		}
//		bulletPatternType: (1,2,3, or 4),
//		movePatternType: (1,2,3, or 4),
//		health: (higher value),
//		timeStamp: performance.now(),
//		interval: interval,
//		itemType: (1 or 2),
//		isBoss: true or false
//	}
//
//------------------------------------------------------------------
Game.components.Enemy = function(spec){

	var sprite = null,
		bulletArray = [],
		that = {
			get center() { return entity.sprite.center; },
			get sprite() { return entity.sprite; },
			get radius() { return spec.radius; },
			get bullets() { return bulletArray; },
			get health() { return spec.health; },
			get points() { return spec.points; },
			get particleType() { return spec.particleType; },
			get itemType() { return spec.itemType; },
			set itemType(value) { spec.itemType = value; },
			get isBoss() { return spec.isBoss; },
			get func() { return spec.func; },
			set img(value) { spec.img = value; }
	};

	//Inherits entity info
	var entity = Game.components.Entity(spec);

	//Generates the basic move and bullet patterns for each enemy
	var bulletPattern = Game.components.EnemyBulletPattern(spec);
	var movePattern = Game.components.EnemyMovePattern(spec);


	//This is the filler enemy spray of bullets. Scary if we want to keep this one...
	that.fire = function(elapsedTime){
		if(spec.center.y > 0.0 && spec.center.x > 0.0){
			bulletPattern.makeBullets(bulletArray);
		}
	}

	that.hit = function(){
		/*if(spec.isBoss){
			if(spec.health <= 100){
				Game.music.playRepeatedSounds('Audio/se_damage01');
			} else {
				Game.music.playRepeatedSounds('Audio/se_damage00');
			}
		} else {
			Game.music.playRepeatedSounds('Audio/se_damage00');
		}*/
		spec.health--;
	}

	//The intersect function for an enemy colliding with a player bullet
	that.intersects = function(other){
		return(entity.intersects(other));
	}

	//Updates the movement of the enemy, whether they fire, and the sprite animation
	//Also returns if the enemy dies from hitting zero health or going off screen
	that.update = function(elapsedTime){
		movePattern.update(elapsedTime);
		entity.sprite.update(elapsedTime, true);
		entity.update(elapsedTime);
		spec.timeStamp += elapsedTime;
		//for(var item in items){
			//items[item].update(elapsedTime);
		//}
		if(spec.timeStamp > spec.interval){
			spec.timeStamp = 0;
			that.fire(elapsedTime);
		}

		//Checks if the enemy is off the screen or down to zero health
		if(!spec.isBoss){
			if(spec.center.y > 1.01 || spec.center.x > 1.01 || spec.center.x < -0.01 || spec.health <= 0){
				if(spec.health <= 0){
					Game.music.playSound('Audio/se_enep00');
				}
				return true;
			} else {
				return false;
			}
		} else {
			//Checks for boss
			if(spec.health <= 0){
				var healthToGain = 700;
				//Switch patterns
				spec.bulletPatternType++;
				if (spec.bulletPatternType === 7){
					spec.interval = 1;
				} else if(spec.bulletPatternType === 11){
					spec.interval = 25;
				} else {
					spec.interval = 1000;
				}
				if(spec.bulletPatternType === 4 || spec.bulletPatternType === 6 || spec.bulletPatternType === 8 || spec.bulletPatternType === 10){
					healthToGain = 500;
					spec.img = Game.assets['animated-mokou'];
					entity.sprite.spritSheet = Game.assets['animated-mokou'];
					spec.size = {width: 0.1, height: 0.1};
					entity.sprite.size = {width: 0.1, height: 0.1};
					var previousY = background.y;
					background.image = new Image();
					background.image.isReady = false;
					background.image.src = '/Images/background.png';
					background.image.onload = function(){
						background.image.isReady = true;
					};
					background.y = previousY;
					background.speed = 1;
				} else {
					spec.img = Game.assets['animated-mokou-phoenix'];
					entity.sprite.spriteSheet = Game.assets['animated-mokou-phoenix'];
					spec.size = {width: 0.4, height: 0.4};
					entity.sprite.size = {width: 0.4, height: 0.4};
					var previousY = background.y;
					background.image = new Image();
					background.image.isReady = false;
					background.image.src = '/Images/backgroundRed.png';
					background.image.onload = function(){
						background.image.isReady = true;
					};
					background.y = previousY;
					background.speed = 1;
				}
				if(spec.bulletPatternType === 11){
					healthToGain = 1000;
				}
				if(spec.bulletPatternType > 11){
					Game.music.playSound('Audio/se_enep01');
					return true;
				} else {
					//Play the transition
					Game.music.playSound('Audio/se_ch00');
					spec.health += healthToGain;
					return false;
				}
			}
		}
	}

	//Generates the enemy sprite animation
	entity.sprite = Game.components.AnimatedSprite({
		spriteSheet: spec.img,
		spriteCount: 4,
		spriteTime: [125, 125, 125, 125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	entity.sprite.isAnimated = true;

	return that;

}
