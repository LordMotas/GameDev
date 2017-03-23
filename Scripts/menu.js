// This namespace holds the Game main menu
Game.menu = (function(components, music){
	'use strict';
	
	var currentMenu,
		menus = [],
		mainMenu = [],
		difficultyMenu = [],
		characterMenu = [],
		characterExtraMenu = [],
		practiceMenu = [],
		replayMenu = [],
		resultMenu = [],
		musicMenu = [],
		optionsMenu = [],
		textStart = {
			text : 'Start',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.025, y : 0.60 },
		},
		textExtraStart = {
			text : 'Extra Start',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.65 },
		},
		textPracticeStart = {
			text : 'Practice Start',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.70 },
		},
		textReplay = {
			text : 'Replay',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
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
		textOption = {
			text : 'Option',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.90 },
		},
		textEasy = {
			text : 'Easy Level',
			font : '30px Arial, sans-serif',
			fill : 'rgba(255, 255, 255, 1)',
			pos : { x : 0.025, y : 0.75 },
		},
		textNormal = {
			text : 'Normal Level',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.80 },
		},
		textHard = {
			text : 'Hard Level',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.85 },
		},
		textLunatic = {
			text : 'Lunatic Level',
			font : '30px Arial, sans-serif',
			fill : 'rgba(136, 136, 136, 1)',
			pos : { x : 0.025, y : 0.90 },
		},
		menuSelection = 0,
		previousSelection = 0;
	
	var that = {

	};

	function changeSelectionVisual(currentMenu, oldID, newID){
		menus[currentMenu].menu[oldID].text.fill = 'rgba(136, 136, 136, 1)';
		menus[currentMenu].menu[newID].text.fill = 'rgba(255, 255, 255, 1)';
	}
	
	that.initialize = function(){
		currentMenu = 0;
		
		//Initialize each menu
		mainMenu.push({text : textStart, select : 1});
		mainMenu.push({text : textExtraStart, select : 2});
		mainMenu.push({text : textPracticeStart, select : 3});
		mainMenu.push({text : textReplay, select : 4});
		mainMenu.push({text : textResult, select : 5});
		mainMenu.push({text : textMusicRoom, select : 6});
		mainMenu.push({text : textOption, select : 7});
		
		difficultyMenu.push({text : textEasy, select : 1, back : 0});
		difficultyMenu.push({text : textNormal, select : 1, back : 0});
		difficultyMenu.push({text : textHard, select : 1, back : 0});
		difficultyMenu.push({text : textLunatic, select : 1, back : 0});
		
		menus.push({
			menu : mainMenu,
			display : true
		});
		menus.push({
			menu : difficultyMenu,
			display : false,
			subtitle : {
				text : 'Select Difficulty',
				font : '42px Arial, sans-serif',
				fill : 'rgba(255, 255, 255, 1)',
				pos : { x : 0.5, y : 0.025 },
			}
		});
		
	};
	
	//This function is used to update the state of the Game model
	that.update = function(elapsedTime){
		//Update the menu item that is being hovered
		changeSelectionVisual(currentMenu, previousSelection, menuSelection);
	};

	that.toggleMenuDown = function(){
		//Move the menu selection down one
		if(menuSelection != menus[currentMenu].menu.length - 1){
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
		
		if(menus[currentMenu].menu[menuSelection].hasOwnProperty('select')){
			menus[currentMenu].display = false;
			currentMenu = menus[currentMenu].menu[menuSelection].select;
			menus[currentMenu].display = true;
			menuSelection = 0;
		}
	};
	
	that.cancelButton = function(){
		//Cancel out of whatever menu we happen to be in
		//Audio sound for cancelling an action
		music.playSound('Audio/se_cancel');
		
		if(menus[currentMenu].menu[menuSelection].hasOwnProperty('back')){
			menus[currentMenu].display = false;
			currentMenu = menus[currentMenu].menu[menuSelection].back;
			menus[currentMenu].display = true;
			menuSelection = 0;
		}
	}
	
	//This function renders the Game model
	that.render = function(renderer){
		// Draw a border around the unit world
		renderer.core.drawRectangle('rgba(255, 255, 255, 1)', 0, 0, 1, 1);

		//Draw the correct menu
		for(var i = 0; i < menus[currentMenu].menu.length; i++){
			renderer.core.drawText(menus[currentMenu].menu[i].text);
		}
		//Draw the subtitle if applicable
		if(menus[currentMenu].hasOwnProperty('subtitle')){
			renderer.core.drawText(menus[currentMenu].subtitle);
		}
	};

	return that;

}(Game.components, Game.music));
