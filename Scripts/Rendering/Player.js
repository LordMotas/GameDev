//The renderer for the player
Game.renderer.Player = (function(core){
	'use strict'
	var that = {};

	that.render = function(sprite){
		Game.renderer.AnimatedSprite.render(sprite.sprite);
		if(sprite.isFocused){
			Game.renderer.AnimatedSprite.render(sprite.focus1);
		}
	}

	return that;

}(Game.renderer.core));
