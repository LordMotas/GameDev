//Not currently used, maybe get ideas from??

Game.components.Enemy1 = function(spec){
	var entity = Game.components.Entity(spec);
	var that = {};

	//Declares the first pattern for the first enemy
	//Should I use it as a that?
	that.pattern = Game.components.Pattern1(spec);

	//Adds each bullet in the pattern to the update/render
	//array for enemy bullets.
	//Should I redeclare the pattern to get the bullets to be
	//based on the enemy's current position? Or is it already there?
	that.fire = function(bulletArray){
		for (bullet in that.pattern.getPattern()){
			bulletArray.push(bullet);
		}
	}



	return that;
}
