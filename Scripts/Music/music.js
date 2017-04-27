Game.music = (function(){
	function loadSound(source){
		let sound = new Audio();
		sound.src = source;
		return sound;
	}

	function loadAudio(){
		Game.sounds = {};
		//Toggle up and down sound
		Game.sounds['Audio/se_select'] = loadSound('Audio/se_select00.wav');
		//Boss death sound
		Game.sounds['Audio/se_enep01'] = loadSound('Audio/se_enep01.wav');
		//Boss charging spell sound
		Game.sounds['Audio/se_ch00'] = loadSound('Audio/se_ch00.wav');
		//Enemy death sound
		Game.sounds['Audio/se_enep00'] = loadSound('Audio/se_enep00.wav');
		//Player gains another life
		Game.sounds['Audio/se_extend'] = loadSound('Audio/se_extend.wav');
		//Grazing a bullet
		Game.sounds['Audio/se_graze'] = loadSound('Audio/se_graze.wav');
		//Get item
		Game.sounds['Audio/se_item00'] = loadSound('Audio/se_item00.wav');
		//Cancel out of menu
		Game.sounds['Audio/se_cancel'] = loadSound('Audio/se_cancel00.wav');
		//Select option on the menu
		Game.sounds['Audio/se_ok'] = loadSound('Audio/se_ok00.wav');
		//Pause button pressed
		Game.sounds['Audio/se_pause'] = loadSound('Audio/se_pause.wav');
		//Player firing sound
		Game.sounds['Audio/se_shot'] = loadSound('Audio/se_plst00.wav');
		//Enemy firing bullets
		Game.sounds['Audio/se_tan0'] = loadSound('Audio/se_tan00.wav');
		//Enemy taking damage
		Game.sounds['Audio/se_damage00'] = loadSound('Audio/se_damage00.wav');
		Game.sounds['Audio/se_damage01'] = loadSound('Audio/se_damage01.wav');
		//Player death sound
		Game.sounds['Audio/se_pldead00'] = loadSound('Audio/se_pldead00.wav');
		//Bomb activation sound
		Game.sounds['Audio/se_nep00'] = loadSound('Audio/se_nep00.wav');
		//Power level is % 1.0
		Game.sounds['Audio/se_powerup'] = loadSound('Audio/se_powerup.wav');

		Game.bgm = {};
		Game.bgm['Audio/menuRemix'] = loadSound('Audio/menuRemix.mp3');
		Game.bgm['Audio/mainBGM'] = loadSound('Audio/mainBGM.mp3');
		Game.bgm['Audio/bossBGM'] = loadSound('Audio/bossBGM.mp3');
	}

	function playSound(soundToPlay){
		Game.sounds[soundToPlay].play();
	}

	function playMusic(musicToPlay){
		Game.bgm[musicToPlay].play();
	}

	function resetSound(soundToPlay){
		Game.sounds[soundToPlay].pause();
		Game.sounds[soundToPlay].currentTime = 0;
	}

	function resetMusic(musicToPlay){
		Game.bgm[musicToPlay].pause();
		Game.bgm[musicToPlay].currentTime = 0;
	}

	function pauseMusic(musicToPlay){
		Game.bgm[musicToPlay].pause();
	}

	function playRepeatedSounds(soundToPlay){
		Game.sounds[soundToPlay].cloneNode(false).play();
	}

	loadAudio();

	return {
		playSound : playSound,
		resetSound : resetSound,
		playMusic : playMusic,
		resetMusic : resetMusic,
		pauseMusic : pauseMusic,
		playRepeatedSounds : playRepeatedSounds,
	}
}());
