// This namespace holds the Game main menu
Game.menu = (function(music, input, model){
	'use strict';

	var currentMenu,
		menus = [],
		mainMenu = [],
		highScoreArray = [],
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
			text : "Score      " + String("000000" + 0).slice(-7),
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
		gamePlayPower = {
			text : 'Power 0.00/4.00',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.25 },
		},
		gamePlayGraze = {
			text : 'Graze 0',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.3 },
		},
		//50, 125, 250, 300, 450
		gamePlayPoint = {
			text : 'Point 0/50',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 1.025, y : 0.35 },
		},
		//Text for the key configuration page
		keyConfigShot = {
			text : 'Shot',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.50 },
		},
		keyConfigBomb = {
			text : 'Bomb',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.55 },
		},
		keyConfigFocus = {
			text : 'Focus',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.60 },
		},
		keyConfigPause = {
			text : 'Pause',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.65 },
		},
		keyConfigLeft = {
			text : 'Left',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.70 },
		},
		keyConfigRight = {
			text : 'Right',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.75 },
		},
		keyConfigUp = {
			text : 'Up',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.80 },
		},
		keyConfigDown = {
			text : 'Down',
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
		creditsMessage = {
			text : 'ZUN and Team Shanghai Alice for sprites',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.07, y : 0.80 },
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
		downKey,
		upKey,
		rightKey,
		leftKey,
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

		var storedHighScoreArray = JSON.parse(localStorage.getItem('highScores'));

		//This is the command needed to make it happen
		//localStorage.setItem("highScores", JSON.stringify(highScoreArray));
		if(storedHighScoreArray === null){
			highScoreArray = [
				{name: 'Motas-----', score: 5000000},
				{name: 'Motas-----', score: 4000000},
				{name: 'Motas-----', score: 3000000},
				{name: 'Motas-----', score: 2000000},
				{name: 'Motas-----', score: 1000000}
			];
		}else{
			highScoreArray = storedHighScoreArray;
		}

		gamePlayHIScore.text = "HIScore  " + highScoreArray[0].score;

		var highScoreText = [];

		//Text for the high score page
		for(var highScore in highScoreArray){
			highScoreText.push({
				text : highScoreArray[highScore].name + highScoreArray[highScore].score,
				font : '30px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.25, y : (highScore * 0.05) + 0.55 },
			});
		}

		//Initialize the default values for commands
		var storedKeyConfigurations = JSON.parse(localStorage.getItem('keyConfig'));
		if(storedKeyConfigurations === null){
			shotKey = input.KeyEvent.DOM_VK_Z;
			bombKey = input.KeyEvent.DOM_VK_X;
			focusKey = input.KeyEvent.DOM_VK_SHIFT;
			pauseKey = input.KeyEvent.DOM_VK_ESCAPE;
			leftKey = input.KeyEvent.DOM_VK_LEFT;
			rightKey = input.KeyEvent.DOM_VK_RIGHT;
			upKey = input.KeyEvent.DOM_VK_UP;
			downKey = input.KeyEvent.DOM_VK_DOWN;
		}else{
			shotKey = storedKeyConfigurations.shotKey;
			bombKey = storedKeyConfigurations.bombKey;
			focusKey = storedKeyConfigurations.focusKey;
			pauseKey = storedKeyConfigurations.pauseKey;
			leftKey = storedKeyConfigurations.leftKey;
			rightKey = storedKeyConfigurations.rightKey;
			upKey = storedKeyConfigurations.upKey;
			downKey = storedKeyConfigurations.downKey;
		}
		updateKeyConfigTexts();

		//Initialize each menu
		mainMenu.push({text : textStart, select : 1});
		mainMenu.push({text : textResult, select : 2});
		mainMenu.push({text : textKeyConfig, select : 3});
		mainMenu.push({text : textCredits, select : 5});

		//Craft the gamePlayMenu
		gamePlayMenu.push({text : gamePlayHIScore, select : 4});
		gamePlayMenu.push({text : gamePlayScore});
		gamePlayMenu.push({text : gamePlayPlayer});
		gamePlayMenu.push({text : gamePlayPower});
		gamePlayMenu.push({text : gamePlayGraze});
		gamePlayMenu.push({text : gamePlayPoint});

		//Craft the resultMenu
		for(var option in highScoreText){
			resultMenu.push({text : highScoreText[option], back : 0, func : function(){enterHighScore();}});
		}

		//Craft the keyConfigMenu
		keyConfigMenu.push({text : keyConfigShot, back : 0, func : function(){that.changeKeyBinding(shotKey);}});
		keyConfigMenu.push({text : keyConfigBomb, back : 0, func : function(){that.changeKeyBinding(bombKey);}});
		keyConfigMenu.push({text : keyConfigFocus, back : 0, func : function(){that.changeKeyBinding(focusKey);}});
		keyConfigMenu.push({text : keyConfigPause, back : 0, func : function(){that.changeKeyBinding(pauseKey);}});
		keyConfigMenu.push({text : keyConfigLeft, back : 0, func : function(){that.changeKeyBinding(leftKey);}});
		keyConfigMenu.push({text : keyConfigRight, back : 0, func : function(){that.changeKeyBinding(rightKey);}});
		keyConfigMenu.push({text : keyConfigUp, back : 0, func : function(){that.changeKeyBinding(upKey);}});
		keyConfigMenu.push({text : keyConfigDown, back : 0, func : function(){that.changeKeyBinding(downKey);}});
		keyConfigMenu.push({text : keyConfigReset, back : 0, func : function(){that.resetKeyBindings();}});

		//Craft the creditsMenu
		creditsMenu.push({text : creditsText, back : 0});

		//Craft the pauseMenu
		pauseMenu.push({text : pauseGameResume, select : 1, func : function(){cancelNextRequest = false}});
		pauseMenu.push({text : pauseGameQuit, select : 0});

		//index 0
		menus.push({
			menuItem : mainMenu,
			display : true,
			reg : {
				handlers : [
					function(){that.toggleMenuDown();},
					function(){that.toggleMenuUp();},
					function(){that.selectMenu();},
					function(){that.cancelButton();},
					function(){that.cancelButton();},
					function(){that.selectMenu();}
				],
				keys : [
					input.KeyEvent.DOM_VK_DOWN,
					input.KeyEvent.DOM_VK_UP,
					input.KeyEvent.DOM_VK_Z,
					input.KeyEvent.DOM_VK_X,
					input.KeyEvent.DOM_VK_ESCAPE,
					input.KeyEvent.DOM_VK_RETURN
				],
				ids: [],
			},
			func : function(){
							for(var i = 0; i < menus.length; i++){
								menus[i].display = false;
							}
							menus[0].display = true;
							//music.playMusic('Audio/menuRemix');
						}
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
				handlers : [
					function(){model.pauseGame(); that.selectMenu(false);},
					function(){model.moveLeft(elapsedTime);},
					function(){model.moveRight(elapsedTime);},
					function(){model.moveUp(elapsedTime);},
					function(){model.moveDown(elapsedTime);},
					function(){model.playerFire(elapsedTime);},
					function(){model.playerBomb(elapsedTime);},
					function(){model.playerFocus(elapsedTime, focusKey);},
				],
				keys : [
					pauseKey,
					leftKey,
					rightKey,
					upKey,
					downKey,
					shotKey,
					bombKey,
					focusKey,
				],
				defaults : [
					input.KeyEvent.DOM_VK_ESCAPE,
					input.KeyEvent.DOM_VK_LEFT,
					input.KeyEvent.DOM_VK_RIGHT,
					input.KeyEvent.DOM_VK_UP,
					input.KeyEvent.DOM_VK_DOWN,
					input.KeyEvent.DOM_VK_Z,
					input.KeyEvent.DOM_VK_X,
					input.KeyEvent.DOM_VK_SHIFT,
				],
				ids: [],
			},
			func : function(){
							music.resetMusic('Audio/menuRemix');
							//music.playMusic('Audio/mainBGM');
							if(!modelInitialized){
								model.initialize();
							} else {
								cancelNextRequest = false;
							}
						}
		});

		//index 2
		menus.push({
			menuItem : resultMenu,
			display : false,
			subtitle : {
				text : 'High Scores',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.35, y : 0.025 },
			},
			reg : {
				handlers : [
					function(){that.cancelButton();},
					function(){that.cancelButton();},
					function(){that.executeFunction();}
				],
				keys : [
					input.KeyEvent.DOM_VK_X,
					input.KeyEvent.DOM_VK_ESCAPE,
					input.KeyEvent.DOM_VK_Z
				],
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
			reg : {
				handlers : [
					function(){that.toggleMenuDown();},
					function(){that.toggleMenuUp();},
					function(){that.executeFunction();},
					function(){that.cancelButton();},
					function(){that.cancelButton();},
					function(){that.executeFunction();}
				],
				keys : [
					input.KeyEvent.DOM_VK_DOWN,
					input.KeyEvent.DOM_VK_UP,
					input.KeyEvent.DOM_VK_Z,
					input.KeyEvent.DOM_VK_X,
					input.KeyEvent.DOM_VK_ESCAPE,
					input.KeyEvent.DOM_VK_RETURN
				],
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
				handlers : [
					function(){that.toggleMenuDown();},
					function(){that.toggleMenuUp();},
					function(){that.selectMenu();},
					function(){that.cancelButton();},
					function(){that.selectMenu();}
				],
				keys : [
					input.KeyEvent.DOM_VK_DOWN,
					input.KeyEvent.DOM_VK_UP,
					input.KeyEvent.DOM_VK_Z,
					input.KeyEvent.DOM_VK_X,
					input.KeyEvent.DOM_VK_RETURN
				],
				ids: [],
			},
			func : function(){menus[1].display = true; music.pauseMusic('Audio/mainBGM');}
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
			message : creditsMessage,
			reg : {
				handlers : [
					function(){that.cancelButton();},
					function(){that.cancelButton();}
				],
				keys : [
					input.KeyEvent.DOM_VK_X,
					input.KeyEvent.DOM_VK_ESCAPE
				],
				ids: [],
			},
		});

		//music.playMusic('Audio/menuRemix');

	};

	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		//Update the menu item that is being hovered
		if(currentMenu != 1 && currentMenu != 2)
			changeSelectionVisual(currentMenu, previousSelection, menuSelection);
		if(currentMenu == 1){
			model.update(elapsedTime);
			menus[currentMenu].menuItem[1].text.text = 'Score      ' + String('000000' + model.score()).slice(-7)
			menus[currentMenu].menuItem[3].text.text = 'Power ' + powerLevel.toFixed(2) + '/4.00';
			menus[currentMenu].menuItem[4].text.text = 'Graze ' + String(model.grazeScore()).slice(-7);
		}
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
		if(menus[currentMenu].menuItem[menuSelection].hasOwnProperty('func')){
			menus[currentMenu].menuItem[menuSelection].func();
		}
	};
	that.changeKeyBinding = function(oldKey){
		music.playSound('Audio/se_ok');
		window.addEventListener('keydown', function test(event) {
			window.removeEventListener('keydown', test, false);
			changeKey(oldKey);
		}, false);
	}

	function changeKey(oldKey){
		var previousKey = oldKey;
		var keyConfigurations = {};
		oldKey = event.keyCode;
		if(previousKey === shotKey)
			shotKey = oldKey;
		if(previousKey === bombKey)
			bombKey = oldKey;
		if(previousKey === focusKey)
			focusKey = oldKey;
		if(previousKey === pauseKey)
			pauseKey = oldKey;
		if(previousKey === leftKey)
			leftKey = oldKey;
		if(previousKey === rightKey)
			rightKey = oldKey;
		if(previousKey === downKey)
			downKey = oldKey;
		if(previousKey === upKey)
			upKey = oldKey;
		keyConfigurations.shotKey = shotKey;
		keyConfigurations.bombKey = bombKey;
		keyConfigurations.focusKey = focusKey;
		keyConfigurations.pauseKey = pauseKey;
		keyConfigurations.leftKey = leftKey;
		keyConfigurations.rightKey = rightKey;
		keyConfigurations.downKey = downKey;
		keyConfigurations.upKey = upKey;
		localStorage.setItem("keyConfig", JSON.stringify(keyConfigurations));
		setTimeout(updateKeyConfigTexts(), 500);
		setTimeout(updateGameKeyConfig(previousKey, oldKey), 500);
	}

	function updateGameKeyConfig(oldKey, newKey){
		for(var i = 0; i < menus[1].reg.keys.length; i++){
			if(menus[1].reg.keys[i] === oldKey){
				console.log("Updated ", oldKey, " to ", newKey);
				menus[1].reg.keys[i] = newKey;
				break;
			}
		}
	}

	function updateKeyConfigTexts(){
		keyConfigShot.text = "Shot " + String.fromCharCode(shotKey);
		keyConfigBomb.text = "Bomb " + String.fromCharCode(bombKey);
		var focusText = (focusKey === 16) ? "Shift" : String.fromCharCode(focusKey);
		keyConfigFocus.text = "Focus " + focusText;
		var pauseText = (pauseKey === 27) ? "Escape" : String.fromCharCode(pauseKey);
		keyConfigPause.text = "Pause " + pauseText;
		var leftText = (leftKey === 37) ? "LeftArr" : String.fromCharCode(leftKey);
		keyConfigLeft.text = "Left " + leftText;
		var rightText = (rightKey === 39) ? "RightArr" : String.fromCharCode(rightKey);
		keyConfigRight.text = "Right " + rightText;
		var upText = (upKey === 38) ? "UpArr" : String.fromCharCode(upKey);
		keyConfigUp.text = "Up " + upText;
		var downText = (downKey === 40) ? "DownArr" : String.fromCharCode(downKey);
		keyConfigDown.text = "Down " + downText;
	}

	that.resetKeyBindings = function(){
		var keyConfigurations = {};
		music.playSound('Audio/se_ok');
		shotKey = input.KeyEvent.DOM_VK_Z;
		bombKey = input.KeyEvent.DOM_VK_X;
		focusKey = input.KeyEvent.DOM_VK_SHIFT;
		pauseKey = input.KeyEvent.DOM_VK_ESCAPE;
		leftKey = input.KeyEvent.DOM_VK_LEFT;
		rightKey = input.KeyEvent.DOM_VK_RIGHT;
		upKey = input.KeyEvent.DOM_VK_UP;
		downKey = input.KeyEvent.DOM_VK_DOWN;
		keyConfigShot.text = "Shot Z";
		keyConfigBomb.text = "Bomb X";
		keyConfigFocus.text = "Focus Shift";
		keyConfigPause.text = "Pause Escape";
		keyConfigLeft.text = "Left LeftArr";
		keyConfigRight.text = "Right RightArr";
		keyConfigUp.text = "Up UpArr";
		keyConfigDown.text = "Down DownArr";
		setTimeout(resetGameKeyConfig(), 500);
		keyConfigurations.shotKey = shotKey;
		keyConfigurations.bombKey = bombKey;
		keyConfigurations.focusKey = focusKey;
		keyConfigurations.pauseKey = pauseKey;
		keyConfigurations.leftKey = leftKey;
		keyConfigurations.rightKey = rightKey;
		keyConfigurations.downKey = downKey;
		keyConfigurations.upKey = upKey;
		localStorage.setItem("keyConfig", JSON.stringify(keyConfigurations));
	};

	function resetGameKeyConfig(){
		for(var i = 0; i < menus[1].reg.keys.length; i++){
			menus[1].reg.keys[i] = menus[1].reg.defaults[i];
		}
	}

	function enterHighScore(){
		var playerName = prompt("You had a great run! Enter your name (Up to 10 characters)");
		var highScoreEntry = {name : String(playerName + "----------").slice(0,10), score : playerScore};
		//Loop through and place it where it goes
		for(var i = 0; i < highScoreArray.length; i++){
			if(highScoreEntry.score > highScoreArray[i].score){
				var temp = highScoreArray[i];
				highScoreArray[i] = highScoreEntry;
				highScoreEntry = temp;
			}
		}
		localStorage.setItem("highScores", JSON.stringify(highScoreArray));
		//Show the updated scores on the page
		for(var highScore in menus[2].menuItem){
			menus[2].menuItem[highScore].text.text = highScoreArray[highScore].name + highScoreArray[highScore].score;
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
				var canRepeat, rate;
				menus[currentMenu].reg.ids = [];
				for(var i = 0; i < menus[currentMenu].reg.handlers.length; i++){
					if(currentMenu === 1){
						canRepeat = true;
					} else {
						canRepeat = false;
					}
					if(menus[currentMenu].reg.keys[i] === bombKey){
						canRepeat = false;
					}
					if(menus[currentMenu].reg.keys[i] === shotKey){
						rate = 100;
					} else {
						rate = undefined;
					}
					var handlerID = myKeyboard.registerHandler(
										menus[currentMenu].reg.handlers[i],
										menus[currentMenu].reg.keys[i],
										canRepeat,
										rate
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

	//This function renders the menu
	that.render = function(renderer){
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
				if(currentMenu === 1){
					//Draw the player lives remaining as well as remaining bombs
					if(playerLives > 0){
						for(var i = 0; i < playerLives; i++){
							renderer.core.drawImage(
								Game.assets['player-star'], //The spritesheet to use
								0, 0, //Which sprite to choose
								16, 16, //Sprite width and sprite height on the spritesheet
								gamePlayPlayer.pos.x + (renderer.core.measureTextWidth(gamePlayPlayer.text) / 2) + (i * 0.05), gamePlayPlayer.pos.y, //Where to draw the sprite
								0.05, 0.05); //Width and height of the sprite
						}
					}
				}
			}
		}
	};

	return that;

}(Game.music, Game.input, Game.model));
