


Game.components.EnemyMovePattern = function(spec){

	var that = {};
	var time = 0;
	var event = 0;
	var temp1;
	var temp2;

	that.update = function(elapsedTime){
		switch(spec.movePatternType){
			//Enemy comes from top of screen and then moves off left
			case 1:
				time += elapsedTime;
				if(time > 5000 && event === 0){
					//Stop in place for a time
					temp1 = -(spec.direction.y);
					spec.direction.x = 0;
					spec.direction.y = 0;
					event++;
				} else if(time > 10000 && event === 1){
					//Move off screen to the left
					spec.direction.x = temp1;
					event++;
				}
				break;
			//Enemy bounces down the screen between the wall and an
			//invisible boundary on screen
			case 2:
				time += elapsedTime;
				if(event === 0){
					//Attempt to make the invisible boundaries depend
					//on the starting point but...not yet
					// temp1 = spec.center.x;
					// temp2 = temp1*2;
					spec.direction.x = .1;
					spec.direction.y = .1;
					event++;
				} else if(spec.center.x > 0.3 || spec.center.x < 0.05){
					//Change direction
					spec.direction.x = -(spec.direction.x);
				}
				break;


		}
	}

	return that;
}
