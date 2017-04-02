

Game.components.Character = function(spec){
	//Inherits entity info for collision stuff
	var that = Game.components.Entity(spec);

	//Not perfected yet but I'm hoping this will
	//add the picture to the object to use.
	that.img = Game.components.Graphics.Texture(spec);

	//For future use, goal is to create a bullet type
	//for the character to use, whether it is a player
	//or an enemy, specific patterns for the bullets
	//are in the next inheritance
	that.bullet.style = Game.components.Bullet(spec);



return that;
}
