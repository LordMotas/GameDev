//This namespace provides the simulation loop for the Touhou Game.
Game.main = (function(renderer, input, model, menu){
	'use strict';
	var lastTimeStamp = performance.now(),
	frameTimes = [],
	textFPS = {
		text : 'FPS',
		font : '30px Arial, sans-serif',
		fill : 'rgba(255, 255, 255, 1)',
		pos : { x : 1.025, y : 1.00 }
	};

	//Process any captured input
	function processInput(elapsedTime){
		myKeyboard.update(elapsedTime);
	}

	//Update the simulation
	function update(elapsedTime){
		menu.update(elapsedTime);
		if(modelInitialized && !cancelNextRequest){
			model.update(elapsedTime);
		}
	}

	//Render the game
	function render(elapsedTime){
		var averageTime = 0,
		fps = 0;

		renderer.core.clearCanvas();
		if(modelInitialized && !cancelNextRequest){
			model.render(Game.renderer);
		}
		
		menu.render(Game.renderer);

		//Draw the border around the world
		renderer.core.drawRectangle('rgba(255, 255, 255, 1)', 0, 0, 1, 1);

		//Show FPS over last several frames
		frameTimes.push(elapsedTime);
		if(frameTimes.length > 50){
			frameTimes = frameTimes.slice(1);
			averageTime = frameTimes.reduce(function(a, b){ return a + b; }) / frameTimes.length;
			//Frames per second is shown with two decimals for precision
			fps = Math.floor((1 / averageTime) * 100000) / 100;
			textFPS.text = 'FPS: ' + fps;
			renderer.core.drawText(textFPS);
		}
	}

	//The gameloop
	function gameLoop(time){
		elapsedTime = (time - lastTimeStamp);
		lastTimeStamp = time;

		processInput(elapsedTime);
		render(elapsedTime);
		update(elapsedTime);
		requestAnimationFrame(gameLoop);
	}

	//The initialization of the game
	function initialize(){
		renderer.core.initialize();
		menu.initialize();

		//Let's listen to a few keyboard inputs to control the simulation
		myKeyboard.registerHandler(function(){
				menu.toggleMenuDown();
			},
			input.KeyEvent.DOM_VK_DOWN, false
		);
		myKeyboard.registerHandler(function(){
				menu.toggleMenuUp();
			},
			input.KeyEvent.DOM_VK_UP, false
		);
		myKeyboard.registerHandler(function(){
				menu.selectMenu();
			},
			input.KeyEvent.DOM_VK_Z, false
		);
		myKeyboard.registerHandler(function(){
				menu.cancelButton();
			},
			input.KeyEvent.DOM_VK_X, false
		);
		myKeyboard.registerHandler(function(){
				menu.selectMenu();
			},
			input.KeyEvent.DOM_VK_RETURN, false
		);
		myKeyboard.registerHandler(function(){
				menu.cancelButton();
			},
			input.KeyEvent.DOM_VK_ESCAPE, false
		);

		//Get the gameloop started
		requestAnimationFrame(gameLoop);
	}

	//Expose only the ability to initialize the Game
	return {
		initialize: initialize
	};

}(Game.renderer, Game.input, Game.model, Game.menu));
