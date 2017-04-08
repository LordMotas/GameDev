

Game.components.EnemyBulletPattern = function(spec){

	var that = {};

	var bullets = [];

	switch(spec.patternType){
		case 1:
			for(var i = 0; i < 5; i++){
				bullets[i] = Game.components.Bullet({
					center: {spec.center.x + i*5, spec.center.y + spec.radius},
					direction: {spec.direction.x, spec.direction.y},
					//more stuff later...
				});
			}
			break;
			
		case 2:
			for(var i = 0; i < 6; i++){
				//Do something else to add to the bullet array...
			}
			break;

	}

	that.getPattern = function(){
		return bullets;
	}



	return that;
}
