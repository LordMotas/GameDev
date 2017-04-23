//The renderer for the player
Game.renderer.Player = (function(core){
	'use strict'
	var that = {};

	that.render = function(sprite){
		Game.renderer.AnimatedSprite.render(sprite.sprite);
		if(sprite.isFocused){
			Game.renderer.AnimatedSprite.render(sprite.focus1);
		}
		if(sprite.bombActive){
			//style, fillStyle, center, radius
			Game.renderer.core.drawCircle("#FFFFFF", sprite.bomb.center, sprite.bomb.radius);
		}

		//Uncomment to render the graze circle
		//Game.renderer.core.drawCircle("#FFFFFF", sprite.grazeCenter, sprite.grazeRadius);

		//Attempt to do player particle effect for when they die,
		//but I'm not sure if this is what is actually happening...at all
		//Game.components.PlayerParticle(sprite.particle, core);
	}

	return that;

}(Game.renderer.core));
