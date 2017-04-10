//------------------------------------------------------------------
//
// Defines a player character.  'spec' is defined as:
//	{
//		center: {x, y},
//		img: Texture,
//		moveRate:
//	}
//
//------------------------------------------------------------------
Game.components.Player = function(spec){
	//Inherits character info
	//var entity = Game.components.Entity(spec);

	//Use later
	//var pattern = Game.components.PlayerBulletPattern(spec);

	var sprite = null,
			that = {
				get center() { return sprite.center; },
				get sprite() { return sprite; },
				get rotation() { return spec.rotation; },
			};

	//Movement patterns for main player
	that.moveLeft = function(elapsedTime) {
		if(sprite.spriteSheet !== Game.assets['animated-nue-left']){
			sprite.spriteSheet = Game.assets['animated-nue-left'];
		}

		if((spec.center.x - spec.moveRate * (elapsedTime / 1000)) - 0.05 > 0.0){
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveRight = function(elapsedTime) {
		if(sprite.spriteSheet !== Game.assets['animated-nue-right']){
			sprite.spriteSheet = Game.assets['animated-nue-right'];
		}
		if((spec.center.x + spec.moveRate * (elapsedTime / 1000)) + 0.05 < 1.0){
			spec.center.x += spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveUp = function(elapsedTime) {
		if((spec.center.y - spec.moveRate * (elapsedTime / 1000)) - 0.05 > 0.0){
			spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveDown = function(elapsedTime) {
		if((spec.center.y + spec.moveRate * (elapsedTime / 1000)) + 0.05 < 1.0){
		spec.center.y += spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.playerFire = function(elapsedTime){
		console.log("Fire bullets from the player");
	}

	that.playerBomb = function(elapsedTime){
		console.log("Activate a bomb from the player");
	}

	that.update = function(elapsedTime){
		//entity.update(elapsedTime);
		var previousX = spec.center.x,
				previousY = spec.center.y;
		sprite.update(elapsedTime, true);
		if(previousX === spec.center.x && previousY === spec.center.y){
			if(sprite.spriteSheet !== Game.assets['animated-nue-standard']){
				sprite.spriteSheet = Game.assets['animated-nue-standard'];
			}
		}

		//Eventually include update to bullet stuff
	}

	sprite = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['animated-nue-standard'],
		spriteCount: 8,
		spriteTime: [150, 150, 150, 150, 150, 150, 150, 150],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	return that;
};
