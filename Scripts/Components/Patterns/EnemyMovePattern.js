


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
					//Stop in place for a time
					temp = -(spec.direction.y);
					spec.direction.x = 0;
					spec.direction.y = 0;
					event++;
				} else if(time > 10000 && event === 1){
					//Move off screen to the left
					spec.direction.x = temp;
					event++;
				}
				break;
			//Enemy bounces down the screen between the wall and an
			//invisible boundary on screen
			case 2:
				time += elapsedTime;
				if(event === 0){
					spec.center.x = .01;
					spec.direction.x = .1;
					spec.direction.y = .05;
					event++;
				} else if(spec.center.x > .2 || spec.center.x < .01){
					//Change direction
					spec.direction.x = -(spec.direction.x);
				}
				break;


		}
	}

	return that;
}
