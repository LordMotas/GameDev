// This namespace holds the Game main menu
Game.menu = (function(components, music, input, model){
	'use strict';
	
	var currentMenu,
		menus = [],
		mainMenu = [],
		gamePlayMenu = [],
		keyConfigMenu = [],
		resultMenu = [],
		pauseMenu = [],
		creditsMenu = [],
		//Text for the main menu
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
		textKeyConfig = {
			text : 'Key Configure',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.85 },
		},
		textCredits = {
			text : 'Credits',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.90 },
		},
		//Text for the gameplay
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
		//50, 125, 250, 300, 450
		gamePlayPoint = {
			text : 'Point 0/50',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.4 },
		},
		//Text for the high score page
		testResult = {
			text : 'TestResult',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.025, y : 0.5 },
		},
		//Text for the key configuration page
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
		keyConfigMessage = {
			text : 'Test Message',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.35, y : 0.50 },
		},
		//Text for the paused screen
		pauseGameResume = {
			text : 'Resume',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.40, y : 0.50 },
		},
		pauseGameQuit = {
			text : 'Quit',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.430, y : 0.60 },
		},
		//Text for the credits page
		creditsText = {
			text : 'Nicholas Biggs and Tanner Olsen',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.15, y : 0.60 },
		},
		//For navigation of the menu
		menuSelection = 0,
		previousSelection = 0,
		previousMenuSelection = [],
		//Keys that can be configured
		shotKey,
		bombKey,
		focusKey,
		pauseKey,
		that = {};

	//Changes the text color in order to show the user 
	function changeSelectionVisual(currentMenu, oldID, newID){
		for(var i = 0; i < menus[currentMenu].menuItem.length; i++){
			menus[currentMenu].menuItem[i].text.fill = 'rgba(136, 136, 136, 1)';
		}
		menus[currentMenu].menuItem[newID].text.fill = 'rgba(255, 255, 255, 1)';
	}
	
	that.initialize = function(){
		currentMenu = 0;
		
		//Initialize the default values for commands
		shotKey = input.KeyEvent.DOM_VK_Z;
		bombKey = input.KeyEvent.DOM_VK_X;
		focusKey = input.KeyEvent.DOM_VK_SHIFT;
		pauseKey = input.KeyEvent.DOM_VK_ESCAPE;
		keyConfigShot.text = "Shot " + String.fromCharCode(shotKey);
		keyConfigBomb.text = "Bomb " + String.fromCharCode(bombKey);
		var focusText = (focusKey === 16) ? "SHIFT" : String.fromCharCode(focusKey);
		keyConfigFocus.text = "Focus " + focusText;
		var pauseText = (pauseKey === 27) ? "ESCAPE" : String.fromCharCode(pauseKey);
		keyConfigPause.text = "Pause " + pauseText;
		
		//Initialize each menu
		mainMenu.push({text : textStart, select : 1});
		mainMenu.push({text : textResult, select : 2});
		mainMenu.push({text : textKeyConfig, select : 3});
		mainMenu.push({text : textCredits, select : 5});
		
		//Craft the gamePlayMenu
		gamePlayMenu.push({text : gamePlayHIScore, select : 4});
		gamePlayMenu.push({text : gamePlayScore});
		gamePlayMenu.push({text : gamePlayPlayer});
		gamePlayMenu.push({text : gamePlayBomb});
		gamePlayMenu.push({text : gamePlayPower});
		gamePlayMenu.push({text : gamePlayGraze});
		gamePlayMenu.push({text : gamePlayPoint});
		
		//Craft the resultMenu
		resultMenu.push({text : testResult, back : 0});
		
		//Craft the keyConfigMenu
		keyConfigMenu.push({text : keyConfigShot, back : 0, func : function(){that.changeShotKeyBinding();}});
		keyConfigMenu.push({text : keyConfigBomb, back : 0, func : function(){that.changeBombKeyBinding();}});
		keyConfigMenu.push({text : keyConfigFocus, back : 0, func : function(){that.changeFocusKeyBinding();}});
		keyConfigMenu.push({text : keyConfigPause, back : 0, func : function(){that.changePauseKeyBinding();}});
		keyConfigMenu.push({text : keyConfigReset, back : 0, func : function(){that.resetKeyBindings();}});
		
		//Craft the creditsMenu
		creditsMenu.push({text : creditsText, back : 0});
		
		//Craft the pauseMenu
		pauseMenu.push({text : pauseGameResume, select : 1});
		pauseMenu.push({text : pauseGameQuit, select : 0});
		
		//index 0
		menus.push({
			menuItem : mainMenu,
			display : true,
			reg : {
				handlers : [function(){that.toggleMenuDown();}, function(){that.toggleMenuUp();}, function(){that.selectMenu();}, function(){that.cancelButton();}, function(){that.cancelButton();}, function(){that.selectMenu();}],
				keys : [input.KeyEvent.DOM_VK_DOWN, input.KeyEvent.DOM_VK_UP, shotKey, bombKey, input.KeyEvent.DOM_VK_ESCAPE, input.KeyEvent.DOM_VK_RETURN],
				ids: [],
			},
			func : function(){for(var i = 0; i < 5; i++){menus[i].display = false;}menus[0].display = true;}
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
				handlers : [function(){model.pauseGame(); that.selectMenu(false);}],
				keys : [pauseKey],
				ids: [],
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
				handlers : [function(){that.cancelButton();}, function(){that.cancelButton();}],
				keys : [bombKey, input.KeyEvent.DOM_VK_ESCAPE],
				ids: [],
			},
		});
		
		//index 3
		menus.push({
			menuItem : keyConfigMenu,
			display : false,
			subtitle : {
				text : 'Key Configuration',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.25, y : 0.025 },
			},
			message : keyConfigMessage,
			reg : {
				handlers : [function(){that.toggleMenuDown();}, function(){that.toggleMenuUp();}, function(){that.executeFunction();}, function(){that.cancelButton();}, function(){that.cancelButton();}, function(){that.executeFunction();}],
				keys : [input.KeyEvent.DOM_VK_DOWN, input.KeyEvent.DOM_VK_UP, shotKey, bombKey, input.KeyEvent.DOM_VK_ESCAPE, input.KeyEvent.DOM_VK_RETURN],
				ids: [],
			},
		});
		
		//index 4
		menus.push({
			menuItem : pauseMenu,
			display : false,
			subtitle : {
				text : 'Game Paused',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.25, y : 0.025 },
			},
			reg : {
				handlers : [function(){that.toggleMenuDown();}, function(){that.toggleMenuUp();}, function(){that.selectMenu();}, function(){that.cancelButton();}, function(){that.selectMenu();}],
				keys : [input.KeyEvent.DOM_VK_DOWN, input.KeyEvent.DOM_VK_UP, shotKey, bombKey, input.KeyEvent.DOM_VK_RETURN],
				ids: [],
			},
			func : function(){menus[1].display = true;}
		});
		
		//index 5
		menus.push({
			menuItem : creditsMenu,
			display : false,
			subtitle : {
				text : 'Credits',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.4, y : 0.025 },
			},
			reg : {
				handlers : [function(){that.cancelButton();}, function(){that.cancelButton();}],
				keys : [bombKey, input.KeyEvent.DOM_VK_ESCAPE],
				ids: [],
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
	
	that.executeFunction = function(){
		console.log("executing function");
		if(menus[currentMenu].menuItem[menuSelection].hasOwnProperty('func')){
			menus[currentMenu].menuItem[menuSelection].func();
		}
	};
	
	function adjustMenus(previousKey, newKey){
		var i, j, k;
		for(i = 0; i < menus.length; i++){
			for(j = 0; j < menus[i].reg.keys.length; j++){
				if(menus[i].reg.keys[j] === previousKey){
					menus[i].reg.keys[j] = newKey;
				}
			}
		}
		myKeyboard.unregisterAll();
		for(k = 0; k < menus[currentMenu].reg.keys.length; k++){
			myKeyboard.registerHandler(menus[currentMenu].reg.handlers[k], menus[currentMenu].reg.keys[k], false);
		}
	}
	
	that.changeShotKeyBinding = function(){
		music.playSound('Audio/se_ok');
		keyConfigMessage.text = "Press a key to change the key binding";
		window.addEventListener('keydown', function test(event) {
			window.removeEventListener('keydown', test, false);
			changeShotKey();
			keyConfigShot.text = "Shot " + String.fromCharCode(shotKey);
		}, false);
	};
	
	function changeShotKey(){
		keyConfigMessage.text = "Shot Key changed from " + shotKey + " to " + event.keyCode;
		var previousKey = shotKey;
		shotKey = event.keyCode;
		//For debouncing
		setTimeout(function(){adjustMenus(previousKey, shotKey);}, 2000);
	}
	
	that.changeBombKeyBinding = function(){
		music.playSound('Audio/se_ok');
		keyConfigMessage.text = "Press a key to change the key binding";
		window.addEventListener('keydown', function test(event) {
			window.removeEventListener('keydown', test, false);
			changeBombKey();
			keyConfigBomb.text = "Bomb " + String.fromCharCode(bombKey);
		}, false);
	};
	
	function changeBombKey(){
		keyConfigMessage.text = "Bomb Key changed from " + bombKey + " to " + event.keyCode;
		var previousKey = bombKey;
		bombKey = event.keyCode;
		//For debouncing
		setTimeout(function(){adjustMenus(previousKey, bombKey);}, 2000);
	}
	
	that.changeFocusKeyBinding = function(){
		music.playSound('Audio/se_ok');
		keyConfigMessage.text = "Press a key to change the key binding";
		window.addEventListener('keydown', function test(event) {
			window.removeEventListener('keydown', test, false);
			changeFocusKey();
			var focusText = (focusKey === 16) ? "SHIFT" : String.fromCharCode(focusKey);
			keyConfigFocus.text = "Focus " + focusText;
		}, false);
	};
	
	function changeFocusKey(){
		keyConfigMessage.text = "Focus Key changed from " + focusKey + " to " + event.keyCode;
		var previousKey = focusKey;
		focusKey = event.keyCode;
		//For debouncing
		setTimeout(function(){adjustMenus(previousKey, focusKey);}, 2000);
	}
	
	that.changePauseKeyBinding = function(){
		music.playSound('Audio/se_ok');
		keyConfigMessage.text = "Press a key to change the key binding";
		window.addEventListener('keydown', function test(event) {
			window.removeEventListener('keydown', test, false);
			changePauseKey();
			var pauseText = (pauseKey === 27) ? "ESCAPE" : String.fromCharCode(pauseKey);
			keyConfigPause.text = "Pause " + pauseText;
		}, false);
	};
	
	function changePauseKey(){
		keyConfigMessage.text = "Pause Key changed from " + pauseKey + " to " + event.keyCode;
		var previousKey = pauseKey;
		pauseKey = event.keyCode;
		//For debouncing
		setTimeout(function(){adjustMenus(previousKey, pauseKey);}, 2000);
	}
	
	that.resetKeyBindings = function(){
		music.playSound('Audio/se_ok');
		var previousShot = shotKey,
			previousBomb = bombKey,
			previousFocus = focusKey,
			previousPause = pauseKey;
		shotKey = input.KeyEvent.DOM_VK_Z;
		bombKey = input.KeyEvent.DOM_VK_X;
		focusKey = input.KeyEvent.DOM_VK_SHIFT;
		pauseKey = input.KeyEvent.DOM_VK_ESCAPE;
		keyConfigShot.text = "Shot " + String.fromCharCode(shotKey);
		keyConfigBomb.text = "Bomb " + String.fromCharCode(bombKey);
		var focusText = (focusKey === 16) ? "SHIFT" : String.fromCharCode(focusKey);
		keyConfigFocus.text = "Focus " + focusText;
		var pauseText = (pauseKey === 27) ? "ESCAPE" : String.fromCharCode(pauseKey);
		keyConfigPause.text = "Pause " + pauseText;	
		//Unregister all commands
		myKeyboard.unregisterAll();
		resetMenus([previousShot, previousBomb, previousFocus, previousPause], [shotKey, bombKey, focusKey, pauseKey]);
	};
	
	function resetMenus(previousKeys, newKeys){
		var i;
		for(i = 0; i < previousKeys.length; i++){
			adjustMenus(previousKeys[i], newKeys[i]);
		}
	}
	
	//Selects the option currently highlighted
	that.selectMenu = function(playMusic = true){
		//Audio sound for selecting the menu option
		if(playMusic)
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
				menus[currentMenu].reg.ids = [];	
				for(var i = 0; i < menus[currentMenu].reg.handlers.length; i++){
					var handlerID = myKeyboard.registerHandler(
										menus[currentMenu].reg.handlers[i],
										menus[currentMenu].reg.keys[i], 
										false
									);
					menus[currentMenu].reg.ids.push(handlerID);
				}
			}
		}
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
				menus[currentMenu].reg.ids = [];	
				for(var i = 0; i < menus[currentMenu].reg.handlers.length; i++){
					var handlerID = myKeyboard.registerHandler(
										menus[currentMenu].reg.handlers[i],
										menus[currentMenu].reg.keys[i], 
										false
									);
					menus[currentMenu].reg.ids.push(handlerID);				
				}
			}
		}
	}
	
	//This function renders the Game model
	that.render = function(renderer){
		// Draw a border around the unit world
		renderer.core.drawRectangle('rgba(255, 255, 255, 1)', 0, 0, 1, 1);

		for(var i = 0; i < menus.length; i++){
			if(menus[i].display){
				//Draw the correct menu
				for(var j = 0; j < menus[i].menuItem.length; j++){
					renderer.core.drawText(menus[i].menuItem[j].text);
					//Draw the subtitle if applicable
					if(menus[i].hasOwnProperty('subtitle')){
						renderer.core.drawText(menus[i].subtitle);
					}
					//Draw the message if applicable
					if(menus[i].hasOwnProperty('message')){
						renderer.core.drawText(menus[i].message);
					}
				}
			}
		}
	};

	return that;

}(Game.components, Game.music, Game.input, Game.model));
