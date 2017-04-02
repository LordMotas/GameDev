

Game.components.Player = function(spec){
	//Inherits character info
	var that = Game.components.Character(spec);

	//Movement patterns for main player
	that.moveLeft = function(){
		spec.center.x -= spec.moveRate * (elapsedTime / 1000);
	};

	that.moveRight = function(){
		spec.center.x += spec.moveRate * (elapsedTime / 1000);
	};

	that.moveUp = function(){
		spec.center.y -= spec.moveRate * (elapsedTime / 1000);
	};

	that.moveDown = function(){
		spec.center.y += spec.moveRate * (elapsedTime / 1000);
	};

	return that;
}
