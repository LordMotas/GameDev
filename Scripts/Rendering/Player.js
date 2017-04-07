//The renderer for the player
Game.renderer.Player = (function(spec){
	'use strict'
	var that = {};
	var entity = Game.renderer.Entity;
	
	//Renders the circle that shows the hitbox
	function renderFocus(spec){
		
	}
	
	that.render = function(){
		entity.render();
		if(spec.isFocused){
			renderFocus(spec);
		}		
	}

	return that;
}());
