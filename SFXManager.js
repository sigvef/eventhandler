function SFXManager(){
	this.sfxs = "perfect1 excellentmonster2 nice1 perfect4 awesome3 awesome1 excellentmonster excellentmonster5 perfect2 excellent1 excellentmonster3 perfect3 awesome2 nice2".split(" ");
	this.sounds = {};
	for(var i in this.sfxs){
		var sound = new Audio();
		sound.src = "audio/announcer/"+this.sfxs[i]+".wav";
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
