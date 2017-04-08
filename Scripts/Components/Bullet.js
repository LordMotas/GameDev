

Game.components.Bullet = function(spec){
	//Inherits entity info for collision stuff
	var entity = Game.components.Entity(spec.bullet);

	var that = {};

	//Sets the rotation of the bullet
	//(Hopefully from the initial picture)
	that.rotate = function(rot){
		spec.bullet.rotation += rot;
	}

	that.update = function(elapsedTime){
		entity.update(elapsedTime);
	}

	return that;

}
