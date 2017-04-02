


Game.components.Enemy = function(spec){
	//Inherits character info
	var that = Game.components.Character(spec);

	//declares the type of the bullet for collision
	//detection purposes
 that.bullet.type = 'enemy';

	//For future use with established pattern generator function
	//Though not quite sure how we'll implement this yet...
	//that.bullet.pattern = Game.components.Pattern(spec);

	return that;

}
