// This namespace holds the Game model.
Game.model = (function(music){
	'use strict';

	//Variables for the game model go here
	var that = {};

	//This function initializes the Game model
	that.initialize = function(){
		console.log("Now initializing the game model...");
	};

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){

	};	
	
	//This function renders the Game model
	that.render = function(renderer){
		
	};
	
	that.pauseGame = function(){
		//Audio sound for pausing the game
		music.playSound('Audio/se_pause');
	}

	return that;

}(Game.music));
