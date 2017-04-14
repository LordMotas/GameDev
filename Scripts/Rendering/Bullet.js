//The renderer for the player
Game.renderer.Bullet = (function(core){
	'use strict'
	var that = {};

	that.render = function(sprite){
    if(sprite.isAnimated){
		  Game.renderer.AnimatedSprite.render(sprite.sprite);
    }
	}

	return that;

}(Game.renderer.core));
