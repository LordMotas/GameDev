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
	}

	function playSound(soundToPlay){
		Game.sounds[soundToPlay].play();
	}
	
	function resetSound(soundToPlay){
		Game.sounds[soundToPlay].pause();
		Game.sounds[soundToPlay].currentTime = 0;
	}
	
	loadAudio();
	
	return {
		playSound : playSound,
		resetSound : resetSound,
	}
}());