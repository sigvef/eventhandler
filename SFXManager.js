function SFXManager(){
	this.announcerSfxs = "perfect1 excellentmonster2 nice1 perfect4 awesome3 awesome1 excellentmonster excellentmonster5 perfect2 excellent1 excellentmonster3 perfect3 awesome2 nice2".split(" ");
	this.announcerSounds = {};
	for(var i in this.announcerSfxs){
		var sound = new Audio();
		sound.src = "audio/announcer/"+this.announcerSfxs[i]+".wav";
		this.announcerSounds[this.annoucerSfxs[i]] = sound;
	}
	this.sfxs = "levelup".split(" ");
	this.sounds = {};
	for(var i in this.sfxs){
		var sound = new Audio();
		sound.src = "audio/"+this.sfxs[i]+".wav";
		this.sounds[this.sfxs[i]] = sound;
	}
}

SFXManager.prototype.play = function(sound){
	this.sounds[sound].currentTime = 0;
	this.sounds[sound].play();
}

SFXManager.prototype.playAnnouncer = function(sound){
	this.announcerSounds[sound].currentTime = 0;
	this.announcerSounds[sound].play();
}

SFXManager.prototype.playRandomAnnouncer = function(){
	this.playAnnouncer(this.announcerSfxs[0|(Math.random()*this.announcerSfxs.length)]);
}
