


Game.components.EnemyMovePattern = function(spec){

	var that = {};
	var time = 0;
	var event = 0;
	var temp;

	that.update = function(elapsedTime){
		switch(spec.movePatternType){
			//Enemy comes from top of screen and then moves off left
			case 1:
				time += elapsedTime;
				if(time > 5000 && event === 0){
					//Change direction
					temp = -(spec.direction.y);
					spec.direction.x = 0;
					spec.direction.y = 0;
					event++;
				} else if(time > 10000 && event === 1){
					spec.direction.x = temp;
					event++;
				}
				break;
			//Enemy bounces down the screen between the wall and an
			//invisible boundary on screen
			case 2:
			
				break;


		}
	}

	return that;
}
