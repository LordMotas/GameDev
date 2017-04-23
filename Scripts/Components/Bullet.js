

Game.components.Bullet = function(spec){
	//Inherits entity info for collision stuff
	var entity = Game.components.Entity(spec);

	var that = {
		get center() { return spec.center },
		set center(value) { spec.center = value; },
		get sprite() { return spec.sprite; },
		set sprite(value) { spec.sprite = value; },
		get spriteCenter() { return spec.sprite.center; },
		set spriteCenter(value) { spec.sprite.center = value; },
		get radius() { return spec.radius; },
		get direction() { return spec.direction; },
		set direction(value) {spec.direction = value; },
		get isGraze() { return entity.isGraze; },
		set isGraze(value) { entity.isGraze = value; }
	};

	that.intersects = function(other){
		return(entity.intersects(other));
	}

	that.update = function(elapsedTime){
		spec.sprite.update(elapsedTime, true);
		entity.update(elapsedTime);
		spec.sprite.center.y = entity.center.y;
		spec.sprite.center.x = entity.center.x;
		if(spec.center.y < -0.001 || spec.center.x > 1.001 || spec.center.x < -0.001 || spec.center.y > 1.001){
			return true;
		} else {
			return false;
		}
	}


	return that;
}
