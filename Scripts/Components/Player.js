


//------------------------------------------------------------------
//
// Defines a player character.  'spec' is defined as:
//	{
//		center: {x, y},
//		direction:  {x, y},
//		radius: ,
//		img: Texture,
//		moveRate:
//	}
//
//------------------------------------------------------------------
Game.components.Player = function(spec){
	//Inherits character info
	var entity = Game.components.Entity(spec);

	//Use later
	//var pattern = Game.components.PlayerBulletPattern(spec);
	
	var that = {};

	//Movement patterns for main player
	that.moveLeft = function(){
		spec.center.x -= spec.moveRate * (elapsedTime / 1000);
	};

	that.moveRight = function(){
		spec.center.x += spec.moveRate * (elapsedTime / 1000);
	};

	that.moveUp = function(){
		spec.center.y -= spec.moveRate * (elapsedTime / 1000);
	};

	that.moveDown = function(){
		spec.center.y += spec.moveRate * (elapsedTime / 1000);
	};

	that.update = function(elapsedTime){
		entity.update(elapsedTime);

		//Eventually include update to bullet stuff
	}

	return that;
}
