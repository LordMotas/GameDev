//------------------------------------------------------------------
//
// Defines an item.  'spec' is defined as:
//	{
//		center: {x, y},
//		direction:  {x, y},
//		radius: ,
//		img: Texture
//	}
//
//------------------------------------------------------------------
Game.components.Item = function(spec){

	var sprite = null,
		that = {
			get center() { return entity.sprite.center; },
			get sprite() { return entity.sprite; },
			get radius() { return spec.radius; },
			get value() { return spec.value; }
	};

	//Inherits entity info
	var entity = Game.components.Entity(spec);

	//The intersect function for an enemy colliding with a player bullet
	that.intersects = function(other){
		return(entity.intersects(other));
	}

	that.update = function(elapsedTime){
		console.log("updating items");
		entity.sprite.update(elapsedTime, true);
		entity.update(elapsedTime);
    if(spec.direction.y <= 0.1){
      spec.direction.y += 0.001;
    }
		//Checks if the item is off the bottom of the screen
		if(spec.center.y > 1.0){
			return true;
		} else {
			return false;
		}
	}

	//Generates the enemy sprite animation
	entity.sprite = Game.components.AnimatedSprite({
		spriteSheet: Game.assets['item-small'],
		spriteCount: 1,
		spriteTime: [125],
		animationScale: spec.animationScale,
		spriteSize: spec.size,			// Maintain the size on the sprite
		spriteCenter: spec.center		// Maintain the center on the sprite
	});

	entity.sprite.isAnimated = true;

	return that;

}
