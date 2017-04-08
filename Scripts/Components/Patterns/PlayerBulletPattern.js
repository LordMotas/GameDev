


Game.components.PlayerBulletPattern = function(spec){
	var that = {};

	var bullets = [];

	//For future stuff, hopefully should change the bullet pattern based
	//on what the player's level is
	that.setPowerLevel = function(powerLevel){
		bullets.length = 0;
		switch(powerLevel){
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
					//Set another pattern for the array...
				}
				break;

		}
	}

	that.getPattern = function(){
		return bullets;
	}



	return that;
}
