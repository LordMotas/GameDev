


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
			get rotation() { return spec.rotation; }
		};
	
	/*
	// Don't allow the character to get outside of the unit world.
	if (sprite.center.x > (1.0 - spec.size.width / 2)) {
		sprite.center.x = 1.0 - spec.size.width / 2;
	}
	if (sprite.center.x < spec.size.width / 2) {
		sprite.center.x = spec.size.width / 2;
	}
	if (sprite.center.y > (1.0 - spec.size.height / 2)) {
		sprite.center.y = 1.0 - spec.size.height / 2;
	}
	if (sprite.center.y < spec.size.height / 2) {
		sprite.center.y = spec.size.height / 2;
	}
	*/
	//Movement patterns for main player
	that.moveLeft = function(elapsedTime) {
		spec.center.x -= spec.moveRate * (elapsedTime / 1000);
		console.log("x: ", spec.center.x,"y: ",spec.center.y );
	};
	
	that.moveRight = function(elapsedTime) {
		spec.center.x += spec.moveRate * (elapsedTime / 1000);
		console.log("x: ", spec.center.x,"y: ",spec.center.y );
	};
	
	that.moveUp = function(elapsedTime) {
		spec.center.y -= spec.moveRate * (elapsedTime / 1000);
		console.log("x: ", spec.center.x,"y: ",spec.center.y );
	};
	
	that.moveDown = function(elapsedTime) {
		spec.center.y += spec.moveRate * (elapsedTime / 1000);
		console.log("x: ", spec.center.x,"y: ",spec.center.y );
	};

	that.update = function(elapsedTime){
		//entity.update(elapsedTime);
		sprite.update(elapsedTime, true);
		
		//Eventually include update to bullet stuff
	}

	sprite = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['animated-nue'],
		spriteCount: 8,
		spriteTime: [150, 150, 150, 150, 150, 150, 150, 150],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});
	
	return that;
};
