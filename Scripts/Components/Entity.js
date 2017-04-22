/* global Game, Object */

//------------------------------------------------------------------
//
// Defines a simulation entity.  'spec' is defined as:
//	{
//		center: {x, y},
//		direction:  {x, y},
//		radius:
//	}
//
//------------------------------------------------------------------
Game.components.Entity = function(spec){
	'use strict';
	var that = Game.components.Circle(spec);

	Object.defineProperty(that, 'direction', {
		value: spec.direction,
		writable: true,
		enumerable: true,
		configurable: true
	});

	spec.isGraze = true;
	//Gives image info to each entity, though needs to use core.js,
	//not Graphics.js
	//that.img = Game.components.Graphics.Texture(spec);



	//------------------------------------------------------------------
	//
	// Move the entity based upon its current direction, elapsed time and
	// direction vector.  When the entity goes outside of the unit world,
	// have it enter at the appropriate side of the world based on its
	// position.
	//
	//------------------------------------------------------------------
	that.update = function(elapsedTime){
		// Divide by 1000 to convert elapsedTime from milliseconds to seconds
		spec.center.x += (spec.direction.x * elapsedTime / 1000);
		spec.center.y += (spec.direction.y * elapsedTime / 1000);

		/*
		This code is for bouncing off of walls if a circle hits the wall
		// If the circle hits the world walls, reflect its direction.
		if((spec.center.x < spec.radius) || (spec.center.x > (1.0 - spec.radius))){
			spec.direction.x *= -1;
		}
		if((spec.center.y < spec.radius) || (spec.center.y > (1.0 - spec.radius))){
			spec.direction.y *= -1;
		}
		*/
	};

	that.updateBomb = function(elapsedTime){
		spec.radius += 0.1 * (elapsedTime/1000);
	}

	that.resetBomb = function(elapsedTime){
		spec.radius = 0.005;
	}

	that.setRadius = function(value){
		spec.radius = value;
	}


	return that;
};
