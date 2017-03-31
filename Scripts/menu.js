// This namespace holds the Game main menu
Game.menu = (function(components, music, input, model){
	'use strict';
	
	var currentMenu,
		menus = [],
		mainMenu = [],
		gamePlayMenu = [],
		keyConfigMenu = [],
		resultMenu = [],
		musicMenu = [],
		textStart = {
			text : 'Start',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.025, y : 0.75 },
		},
		textResult = {
			text : 'Result',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.80 },
		},
		textMusicRoom = {
			text : 'Music Room',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.85 },
		},
		textKeyConfig = {
			text : 'Key Configure',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.90 },
		},
		gamePlayHIScore = {
			text : 'HIScore',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.0 },
		},
		gamePlayScore = {
			text : 'Score',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.05 },
		},
		gamePlayPlayer = {
			text : 'Player',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.15 },
		},
		gamePlayBomb = {
			text : 'Bomb',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.2 },
		},
		gamePlayPower = {
			text : 'Power',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.3 },
		},
		gamePlayGraze = {
			text : 'Graze',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.35 },
		},
		gamePlayPoint = {
			text : 'Point',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.4 },
		},
		testMusic = {
			text : 'TestMusic',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.5 },
		},
		testResult = {
			text : 'TestResult',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.025, y : 0.5 },
		},
		keyConfigShot = {
			text : 'Shot',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.70 },
		},
		keyConfigBomb = {
			text : 'Bomb',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.75 },
		},
		keyConfigFocus = {
			text : 'Focus',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.80 },
		},
		keyConfigPause = {
			text : 'Pause',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.85 },
		},
		keyConfigReset = {
			text : 'Reset',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.90 },
		},
		
		menuSelection = 0,
		previousSelection = 0,
		previousMenuSelection = [],
		that = {};

	function changeSelectionVisual(currentMenu, oldID, newID){
		for(var i = 0; i < menus[currentMenu].menuItem.length; i++){
			menus[currentMenu].menuItem[i].text.fill = 'rgba(136, 136, 136, 1)';
		}
		menus[currentMenu].menuItem[newID].text.fill = 'rgba(255, 255, 255, 1)';
	}
	
	that.initialize = function(){
		currentMenu = 0;
		
		//Initialize each menu
		mainMenu.push({text : textStart, select : 1});
		mainMenu.push({text : textResult, select : 2});
		mainMenu.push({text : textMusicRoom, select : 3});
		mainMenu.push({text : textKeyConfig, select : 4});
		
		//Craft the gamePlayMenu
		gamePlayMenu.push({text : gamePlayHIScore});
		gamePlayMenu.push({text : gamePlayScore});
		gamePlayMenu.push({text : gamePlayPlayer});
		gamePlayMenu.push({text : gamePlayBomb});
		gamePlayMenu.push({text : gamePlayPower});
		gamePlayMenu.push({text : gamePlayGraze});
		gamePlayMenu.push({text : gamePlayPoint});
		
		//Craft the resultMenu
		resultMenu.push({text : testResult, back : 0});
		
		//Craft the musicMenu
		musicMenu.push({text : testMusic, back : 0});	
		
		//Craft the keyConfigMenu
		keyConfigMenu.push({text : keyConfigShot, back : 0});
		keyConfigMenu.push({text : keyConfigBomb, back : 0});
		keyConfigMenu.push({text : keyConfigFocus, back : 0});
		keyConfigMenu.push({text : keyConfigPause, back : 0});
		keyConfigMenu.push({text : keyConfigReset, back : 0});
		
		//index 0
		menus.push({
			menuItem : mainMenu,
			display : true,
			reg : {
				handlers : [function(){that.toggleMenuDown();}, function(){that.toggleMenuUp();}, function(){that.selectMenu(myKeyboard);}, function(){that.cancelButton(myKeyboard);}],
				keys : [input.KeyEvent.DOM_VK_DOWN, input.KeyEvent.DOM_VK_UP, input.KeyEvent.DOM_VK_Z, input.KeyEvent.DOM_VK_X],
			},
		});
		
		//index 1
		menus.push({
			menuItem : gamePlayMenu,
			display : false,
			subtitle : {
				text : '東方弾幕',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 1.025, y : 0.7 },
			},
			reg : {
				handlers : [function(){model.pauseGame();}],
				keys : [input.KeyEvent.DOM_VK_ESCAPE],
			},
		});
		
		//index 2
		menus.push({
			menuItem : resultMenu,
			display : false,
			subtitle : {
				text : 'History of Score and Spell Cards',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.015, y : 0.025 },
			},
			reg : {
				handlers : [function(){that.cancelButton(myKeyboard);}],
				keys : [input.KeyEvent.DOM_VK_X],
			},
		});
		
		//index 3
		menus.push({
			menuItem : musicMenu,
			display : false,
			subtitle : {
				text : 'Music Room',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.35, y : 0.025 },
			},
			reg : {
				handlers : [function(){that.toggleMenuDown();}, function(){that.toggleMenuUp();}, function(){that.playMusic();}, function(){that.cancelButton(myKeyboard);}],
				keys : [input.KeyEvent.DOM_VK_DOWN, input.KeyEvent.DOM_VK_UP, input.KeyEvent.DOM_VK_Z, input.KeyEvent.DOM_VK_X],
			},
		});
		
		//index 4
		menus.push({
			menuItem : keyConfigMenu,
			display : false,
			subtitle : {
				text : 'Key Configuration',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.25, y : 0.025 },
			},
			reg : {
				handlers : [function(){that.toggleMenuDown();}, function(){that.toggleMenuUp();}, function(){that.selectMenu(myKeyboard);}, function(){that.cancelButton(myKeyboard);}],
				keys : [input.KeyEvent.DOM_VK_DOWN, input.KeyEvent.DOM_VK_UP, input.KeyEvent.DOM_VK_Z, input.KeyEvent.DOM_VK_X],
			},
		});
	};
	
	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		//Update the menu item that is being hovered
		if(currentMenu != 1 && currentMenu != 2)
			changeSelectionVisual(currentMenu, previousSelection, menuSelection);
		if(currentMenu == 1)
			model.update(elapsedTime);
	};

	that.toggleMenuDown = function(){
		//Move the menu selection down one
		if(menuSelection != menus[currentMenu].menuItem.length - 1){
			//Audio sound for selecting the menu option
			music.playSound('Audio/se_select');
			previousSelection = menuSelection;
			menuSelection++;
		}
	};
	
	that.toggleMenuUp = function(){
		//Move the menu selection up one
		if(menuSelection != 0){
			//Audio sound for selecting the menu option
			music.playSound('Audio/se_select');
			previousSelection = menuSelection;
			menuSelection--;
		}
	};
	
	//Selects the option currently highlighted
	that.selectMenu = function(){
		//Audio sound for selecting the menu option
		music.playSound('Audio/se_ok');
		
		if(menus[currentMenu].menuItem[menuSelection].hasOwnProperty('select')){
			//Change the previous text color back to grey
			if(currentMenu == 0) //Only works on the main menu
				menus[currentMenu].menuItem[menuSelection].text.fill = 'rgba(136, 136, 136, 1)';
			menus[currentMenu].display = false;
			previousMenuSelection.push(menuSelection);
			currentMenu = menus[currentMenu].menuItem[menuSelection].select;
			if(menus[currentMenu].hasOwnProperty('func')){
				menus[currentMenu].func();
			}
			menus[currentMenu].display = true;
			menuSelection = 0;
			previousSelection = 0;
			//Unregister all commands
			myKeyboard.unregisterAll();
			//Register commands in the list
			if(menus[currentMenu].hasOwnProperty('reg')){
				for(var i = 0; i < menus[currentMenu].reg.handlers.length; i++){
					myKeyboard.registerHandler(
						menus[currentMenu].reg.handlers[i],
						menus[currentMenu].reg.keys[i], 
						false
					);
				}
			}
		}
	};
	
	//Executes the function associated with a particular menu
	that.executeMenu = function(){
		
	};
	
	that.cancelButton = function(){
		//Cancel out of whatever menu we happen to be in
		//Audio sound for cancelling an action
		music.playSound('Audio/se_cancel');
		
		//Cancel out of whatever menu we happen to be in
		if(menus[currentMenu].menuItem[menuSelection].hasOwnProperty('back')){
			if(currentMenu == 0)
				menus[currentMenu].menuItem[menuSelection].text.fill = 'rgba(136, 136, 136, 1)';
			menus[currentMenu].display = false;
			currentMenu = menus[currentMenu].menuItem[menuSelection].back;
			if(menus[currentMenu].hasOwnProperty('func')){
				menus[currentMenu].func();
			}
			menus[currentMenu].display = true;
			menuSelection = previousMenuSelection.pop();
			//Unregister all commands
			myKeyboard.unregisterAll();
			//Register commands in the list
			if(menus[currentMenu].hasOwnProperty('reg')){
				for(var i = 0; i < menus[currentMenu].reg.handlers.length; i++){
					myKeyboard.registerHandler(
						menus[currentMenu].reg.handlers[i],
						menus[currentMenu].reg.keys[i], 
						false
					);					
				}
			}
		}
	}
	
	//This function renders the Game model
	that.render = function(renderer){
		// Draw a border around the unit world
		renderer.core.drawRectangle('rgba(255, 255, 255, 1)', 0, 0, 1, 1);

		//Draw the correct menu
		for(var i = 0; i < menus[currentMenu].menuItem.length; i++){
			renderer.core.drawText(menus[currentMenu].menuItem[i].text);
		}
		//Draw the subtitle if applicable
		if(menus[currentMenu].hasOwnProperty('subtitle')){
			renderer.core.drawText(menus[currentMenu].subtitle);
		}
	};

	return that;

}(Game.components, Game.music, Game.input, Game.model));
