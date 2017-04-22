var Game = {
	input: {},
	components: {},
	renderer: {},
	assets: {},
},
myKeyboard,
cancelNextRequest = false,
modelInitialized = false,
elapsedTime,
powerLevel = 0.0;
playerLives = 3;

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
Game.loader = (function() {
	'use strict';
	var scriptOrder = [{
			scripts: ['Components/Bullet', 'Components/AnimatedSprite', 'Components/Circle', 'Components/Enemy', 'Components/Entity', 'Components/Player'],
			message: 'Components loaded',
			onComplete: null
		}, {
			scripts: ['Components/Patterns/PlayerBulletPattern', 'Components/Patterns/EnemyBulletPattern', 'Components/Patterns/EnemyMovePattern'],
			message: 'Patterns loaded',
			onComplete: null
		}, {
			scripts: ['Components/Particles/BulletParticleDeath', 'Components/Particles/EnemyParticleDeath', 'Components/Particles/PlayerParticleDeath'],
			message: 'Particles loaded',
			onComplete: null
		}, {
			scripts: ['Input/Keyboard', ],
			message: 'Input loaded',
			onComplete: null
		}, {
			scripts: ['Music/music'],
			message: 'Music loaded',
			onComplete: null
		},	{
			scripts: ['Rendering/core'],
			message: 'Rendering core loaded',
			onComplete: null
		}, {
			scripts: ['Rendering/AnimatedSprite'],
			message: 'Animated Sprite loaded',
			onComplete: null
		}, {
			scripts: ['Rendering/Entity', 'Rendering/Player', 'Rendering/Bullet'],
			message: 'Rendering loaded',
			onComplete: null
		},  {
			scripts: ['model'],
			message: 'Model loaded',
			onComplete: null
		},  {
			scripts: ['menu'],
			message: 'Main Menu loaded',
			onComplete: null
		},	{
			scripts: ['main'],
			message: 'Main loaded',
			onComplete: null
		}],
		assetOrder = [{
			key: 'animated-byakuren-standard',
			source: '/Images/Player/Byakuren_standard.png'
		},
		{
			key: 'animated-byakuren-left',
			source: '/Images/Player/Byakuren_left.png'
		},
		{
			key: 'animated-byakuren-right',
			source: '/Images/Player/Byakuren_right.png'
		},
		{
			key: 'focus1',
			source: '/Images/Player/Focus1.png'
		},
		{
			key: 'animated-player-bullet',
			source: '/Images/Player/bullets.png'
		},
		{
			key: 'animated-enemy1',
			source: '/Images/Enemies/Enemy1.png'
		},
		{
			key: 'enemy-bullet-red-small',
			source: '/Images/Bullets/SmallCircles/RedCircleSmall.png'
		},
		{
			key: 'enemy-bullet-red',
			source: '/Images/Bullets/Circles/RedCircle.png'
		},
		{
			key: 'enemy-bullet-red-large',
			source: '/Images/Bullets/LargeCircles/RedCircleLarge.png'
		},
		{
			key: 'animated-mokou',
			source: '/Images/Enemies/MokouIdle.png'
		},
		{
			key: 'animated-mokou-phoenix',
			source: '/Images/Enemies/MokouPhoenix.png'
		},
		{
			key: 'player-star',
			source: '/Images/Items/Star.png'
		},
		{
			key: 'particle-fire',
			source: '/Images/Particles/fire.png'
		},
		{
			key: 'particle-smoke',
			source: '/Images/Particles/smoke.png'
		}
		];

	//------------------------------------------------------------------
	//
	// Helper function used to load scripts in the order specified by the
	// 'scripts' parameter.  'scripts' expects an array of objects with
	// the following format...
	//	{
	//		scripts: [script1, script2, ...],
	//		message: 'Console message displayed after loading is complete',
	//		onComplete: function to call when loading is complete, may be null
	//	}
	//
	//------------------------------------------------------------------
	function loadScripts(scripts, onComplete) {
		var entry = 0;
		//
		// When we run out of things to load, that is when we call onComplete.
		if (scripts.length > 0) {
			entry = scripts[0];
			require(entry.scripts, function() {
				//console.log(entry.message);
				if (entry.onComplete) {
					entry.onComplete();
				}
				scripts.splice(0, 1);
				loadScripts(scripts, onComplete);
			});
		} else {
			onComplete();
		}
	}

	//------------------------------------------------------------------
	//
	// Helper function used to load assets in the order specified by the
	// 'assets' parameter.  'assets' expects an array of objects with
	// the following format...
	//	{
	//		key: 'asset-1',
	//		source: 'asset/url/asset.png'
	//	}
	//
	// onSuccess is invoked per asset as: onSuccess(key, asset)
	// onError is invoked per asset as: onError(error)
	// onComplete is invoked once per 'assets' array as: onComplete()
	//
	//------------------------------------------------------------------
	function loadAssets(assets, onSuccess, onError, onComplete) {
		var entry = 0;
		//
		// When we run out of things to load, that is when we call onComplete.
		if (assets.length > 0) {
			entry = assets[0];
			loadAsset(entry.source,
				function(asset) {
					onSuccess(entry, asset);
					assets.splice(0, 1);
					loadAssets(assets, onSuccess, onError, onComplete);
				},
				function(error) {
					onError(error);
					assets.splice(0, 1);
					loadAssets(assets, onSuccess, onError, onComplete);
				});
		} else {
			onComplete();
		}
	}

	//------------------------------------------------------------------
	//
	// This function is used to asynchronously load image and audio assets.
	// On success the asset is provided through the onSuccess callback.
	// Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
	//
	//------------------------------------------------------------------
	function loadAsset(source, onSuccess, onError) {
		var xhr = new XMLHttpRequest(),
			asset = null,
			fileExtension = source.substr(source.lastIndexOf('.') + 1);	// Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

		if (fileExtension) {
			xhr.open('GET', source, true);
			xhr.responseType = 'blob';

			xhr.onload = function() {
				if (xhr.status === 200) {
					if (fileExtension === 'png' || fileExtension === 'jpg') {
						asset = new Image();
					} else if (fileExtension === 'mp3' || fileExtension === 'wav') {
						asset = new Audio();
					} else {
						if (onError) { onError('Unknown file extension: ' + fileExtension); }
					}
					asset.onload = function() {
						window.URL.revokeObjectURL(asset.src);
					};
					asset.src = window.URL.createObjectURL(xhr.response);
					if (onSuccess) { onSuccess(asset); }
				} else {
					if (onError) { onError('Failed to retrieve: ' + source); }
				}
			};
		} else {
			if (onError) { onError('Unknown file extension: ' + fileExtension); }
		}

		xhr.send();
	}

	//------------------------------------------------------------------
	//
	// Called when all the scripts are loaded, it kicks off the demo app.
	//
	//------------------------------------------------------------------
	function mainComplete() {
		console.log('Loading Complete');
		Game.main.initialize();
	}

	//
	// Start with loading the assets, then the scripts.
	console.log('Starting to dynamically load project assets');
	loadAssets(assetOrder,
		function(source, asset) {	// Store it on success
			Game.assets[source.key] = asset;
		},
		function(error) {
			console.log(error);
		},
		function() {
			console.log('All assets loaded');
			console.log('Starting to dynamically load project scripts');
			loadScripts(scriptOrder, mainComplete);
		}
	);

}());
