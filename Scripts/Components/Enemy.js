
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
//		patternType: (1,2,3, or 4),
//		health: (higher value)
//	}
//
//------------------------------------------------------------------
Game.components.Enemy = function(spec){
	
	var sprite = null,
		bulletArray = [],
		//movePattern = components.EnemyMovePattern(spec.patternType),
		that = {
			get center() { return entity.sprite.center; },
			get sprite() { return entity.sprite; },
			get radius() { return spec.radius; },
			get bullets() { return bulletArray; },
			get health() { return spec.health; }
	};

	//Inherits entity info
	var entity = Game.components.Entity(spec);
	
	//Temporary, adds a single bullet (I believe)
	//var bullet = Game.components.Bullet(spec);

	/*Here I want to try to generate a pattern for the bullets (and enemies) to follow
	* but the question is, do I make an object for it like this?
	* What about making several pattern objects and then using the fire()
	* to just add that sequenced pattern to the array of enemy bullets?
	*/
	//var bulletPattern = Game.components.EnemyBulletPattern(spec);
	//var movePattern = Game.components.EnemyMovePattern(spec);


	//This is the filler enemy spray of bullets. Scary if we want to keep this one...
	that.fire = function(elapsedTime){
		var bullet;
		Game.music.playRepeatedSounds('Audio/se_shot');
		var bulletSet = [];
				bulletSet.push({
					direction : {x : 0, y : 0.75},
					center : {x : spec.center.x + 0.01, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : 0, y : 0.75},
					center : {x : spec.center.x - 0.01, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : 0.05, y : 0.75},
					center : {x : spec.center.x + 0.02, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : -0.05, y : 0.75},
					center : {x : spec.center.x - 0.02, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : 0.10, y : 0.75},
					center : {x : spec.center.x + 0.03, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : -0.10, y : 0.75},
					center : {x : spec.center.x - 0.03, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : 0.15, y : 0.75},
					center : {x : spec.center.x + 0.04, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : -0.15, y : 0.75},
					center : {x : spec.center.x - 0.04, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : 0.20, y : 0.75},
					center : {x : spec.center.x + 0.05, y : spec.center.y + 0.05},
				});
				bulletSet.push({
					direction : {x : -0.20, y : 0.75},
					center : {x : spec.center.x - 0.05, y : spec.center.y + 0.05},
				});
		for(var index in bulletSet){
			bullet = Game.components.Bullet({
				direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
				center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
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


	// that.update = function(elapsedTime){
	// 	//Needs to use the pattern to update how the entity moves, like:
	// 	/*
	// 	movePattern.update(elapsedTime, entity);
	// 	*/
	// 	entity.update(elapsedTime);
	// 	entity.sprite.update(elapsedTime);
	// 	//movePattern.update(elapsedTime);

	// 	//Add bullet generation stuff using pattern if possible

	// }

	that.update = function(elapsedTime){
		entity.sprite.update(elapsedTime, true);
		entity.update(elapsedTime);
		//entity.sprite.spriteSheet = Game.assets['animated-enemy1'];

		that.fire(elapsedTime);


		//Checks if the enemy is off the screen or down to zero health
		if(spec.center.y > 1.0 || spec.center.x > 1.0 || spec.center.x < 0.0 || spec.health <= 0){
			return true;
		} else {
			return false;
		}
		//Eventually include update to bullet stuff
	}

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
