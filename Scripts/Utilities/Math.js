// Input handling support
Game.utilities.math = (function(){
	'use strict';
	var that = {};

	//------------------------------------------------------------------
	//
	// This method checks to see if any part of the circle is inside of
	// the square.  If it is, true is returned, false otherwise.
	//
	// This code adapted from: http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
	//
	//------------------------------------------------------------------
	that.circleTouchSquare = function(circle, square){
		var squareSizeby2 = square.size / 2,
			circleDistanceX,
			circleDistanceY,
			distanceX,
			distanceY,
			cornerDistanceSq;

		circleDistanceX = Math.abs(circle.center.x - square.center.x);
		if(circleDistanceX > (squareSizeby2 + circle.radius)){ return false; }
		circleDistanceY = Math.abs(circle.center.y - square.center.y);
		if(circleDistanceY > (squareSizeby2 + circle.radius)){ return false; }

		if(circleDistanceX <= squareSizeby2){ return true; }
		if(circleDistanceY <= squareSizeby2){ return true; }

		distanceX = (circleDistanceX - squareSizeby2);
		distanceY = (circleDistanceY - squareSizeby2);
		distanceX *= distanceX;
		distanceY *= distanceY;

		cornerDistanceSq = distanceX + distanceY;

		return (cornerDistanceSq <= circle.radiusSq);
	};

	that.distance = function(pt1x, pt1y, pt2x, pt2y){
		var distx = Math.abs(pt2x-pt1x);
		var disty = Math.abs(pt2y-pt1y);
		return Math.sqrt(distx*distx+disty*disty);
	}

	return that;
}());
