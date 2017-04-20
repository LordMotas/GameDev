
//Work on this...
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
//		interval: interval
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
			get health() { return spec.health; }
	};

	//Inherits entity info
	var entity = Game.components.Entity(spec);

	//Generates the basic move and bullet patterns for each enemy
	var bulletPattern = Game.components.EnemyBulletPattern(spec);
	var movePattern = Game.components.EnemyMovePattern(spec);


	//This is the filler enemy spray of bullets. Scary if we want to keep this one...
	that.fire = function(elapsedTime){
		bulletPattern.makeBullets(bulletArray);
	}

	that.hit = function(){
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
		if(spec.timeStamp > spec.interval){
			spec.timeStamp = 0;
			that.fire(elapsedTime);
		}

		//Checks if the enemy is off the screen or down to zero health
		if(spec.center.y > 1.0 || spec.center.x > 1.0 || spec.center.x < 0.0 || spec.health <= 0){
			return true;
		} else {
			return false;
		}
	}

	//Generates the enemy sprite animation
	entity.sprite = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['animated-enemy1'],
		spriteCount: 4,
		spriteTime: [125, 125, 125, 125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	entity.sprite.isAnimated = true;

	return that;

}
