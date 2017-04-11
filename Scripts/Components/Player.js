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
			focus1 = null,
			focus2 = null,
			that = {
				get center() { return sprite.center; },
				get sprite() { return sprite; },
				get rotation() { return spec.rotation; },
				get isFocused() { return spec.isFocused; },
				get style() { return spec.style; },
				get radius() { return spec.radius; },
				get focus1() { return focus1; },
				get focus2() { return focus2; },
			};

	//Movement patterns for main player
	that.moveLeft = function(elapsedTime) {
		if(sprite.spriteSheet !== Game.assets['animated-byakuren-left']){
			sprite.spriteSheet = Game.assets['animated-byakuren-left'];
		}

		if((spec.center.x - spec.moveRate * (elapsedTime / 1000)) - 0.05 > 0.0){
			spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		}
	};

	that.moveRight = function(elapsedTime) {
		if(sprite.spriteSheet !== Game.assets['animated-byakuren-right']){
			sprite.spriteSheet = Game.assets['animated-byakuren-right'];
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
		sprite.update(elapsedTime, true);
		focus1.update(elapsedTime, true);
		focus2.update(elapsedTime, true);
		if(previousX === spec.center.x && previousY === spec.center.y){
			if(sprite.spriteSheet !== Game.assets['animated-byakuren-standard']){
				sprite.spriteSheet = Game.assets['animated-byakuren-standard'];
			}
		}

		//Eventually include update to bullet stuff
	}

	sprite = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['animated-byakuren-standard'],
		spriteCount: 8,
		spriteTime: [125, 125, 125, 125, 125, 125, 125, 125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	focus1 = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['focus1'],
		spriteCount: 8,
		spriteTime: [125, 125, 125, 125, 125, 125, 125, 125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	return that;
};
