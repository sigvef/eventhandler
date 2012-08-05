function SFXManager(){
	this.sfxs = "great awesome nice sweet".split(" ");
	this.sounds = {};
	for(var i in this.sfxs){
		var sound = new Audio();
		sound.src = "audio/"+this.sfxs[i]+".ogg";	
		this.sounds[this.sfxs[i]] = sound;
	}
}

SFXManager.prototype.play = function(sound){
	this.sounds[sound].currentTime = 0;
	this.sounds[sound].play();
}

SFXManager.prototype.playRandom = function(){
	this.play(this.sfxs[0|(Math.random()*this.sfxs.length)]);
}
