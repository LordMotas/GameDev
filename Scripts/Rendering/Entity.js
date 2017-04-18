//The basic renderer for entities
Game.renderer.Entity = (function(core){
	'use strict';
	var that = {};

	that.render = function(sprite){
		if(sprite.sprite.isAnimated){
			Game.renderer.AnimatedSprite.render(sprite.sprite);
		}
	}

	return that;

}(Game.renderer.core));
