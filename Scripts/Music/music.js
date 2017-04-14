Game.music = (function(){
	function loadSound(source){
		let sound = new Audio();
		sound.src = source;
		return sound;
	}

	function loadAudio(){
		Game.sounds = {};
		Game.sounds['Audio/se_select'] = loadSound('Audio/se_select00.wav');
		Game.sounds['Audio/se_enep'] = loadSound('Audio/se_enep01.wav');
		Game.sounds['Audio/se_extend'] = loadSound('Audio/se_extend.wav');
		Game.sounds['Audio/se_graze'] = loadSound('Audio/se_graze.wav');
		Game.sounds['Audio/se_cancel'] = loadSound('Audio/se_cancel00.wav');
		Game.sounds['Audio/se_ok'] = loadSound('Audio/se_ok00.wav');
		Game.sounds['Audio/se_pause'] = loadSound('Audio/se_pause.wav');
		Game.sounds['Audio/se_shot'] = loadSound('Audio/se_plst00.wav');
		Game.bgm = {};
		Game.bgm['Audio/menuRemix'] = loadSound('Audio/menuRemix.mp3');
		Game.bgm['Audio/mainBGM'] = loadSound('Audio/mainBGM.mp3');
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
