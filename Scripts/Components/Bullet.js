

Game.components.Bullet = function(spec){
	//Inherits entity info for collision stuff
	var that = Game.components.Entity(spec);

	//Sets the rotation of the bullet
	//(Hopefully from the initial picture)
	that.rotate = function(rot){
		spec.rotation += rot;
	}

	return that;

}
