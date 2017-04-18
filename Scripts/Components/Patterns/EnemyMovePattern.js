


Game.components.EnemyMovePattern = function(spec){

	var that = {};
	var time = performance.now();

	switch(spec.patternType){
		//Enemy comes from top of screen and then moves off left
		case 1:
			
			that.update = function(elapsedTime){
				if(time - elapsedTime > 5000){
					//Change direction
					spec.direction.x = -(spec.direction.y);
					spec.direction.y = 0;
				}
			}

			break;
		//Enemy bounces down the screen between the wall and an
		//invisible boundary on screen
		case 2:
			
			break;


	}


	return that;
}
