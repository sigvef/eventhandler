function SFXManager(){
	this.announcerSfxs = "perfect1 excellentmonster2 nice1 perfect4 awesome3 awesome1 excellentmonster excellentmonster5 perfect2 excellent1 excellentmonster3 perfect3 awesome2 nice2".split(" ");
	this.announcerSounds = {};
	for(var i in this.announcerSfxs){
		var sound = new Audio();
        loaded++;
        sound.addEventListener("loadeddata", function(){this.lloaded||loaded--;this.lloaded = true;});
        sound.addEventListener("canplay", function(){this.lloaded||loaded--;this.lloaded = true;});
		sound.src = "audio/announcer/"+this.announcerSfxs[i]+".wav";
		this.announcerSounds[this.announcerSfxs[i]] = sound;
	}
	this.sfxs = "levelup".split(" ");
	this.sounds = {};
	for(var i in this.sfxs){
		var sound = new Audio();
        loaded++;
        sound.addEventListener("loadeddata", function(){this.lloaded||loaded--;this.lloaded = true;});
        sound.addEventListener("canplay", function(){this.lloaded||loaded--;this.lloaded = true;});
		sound.src = "audio/"+this.sfxs[i]+".ogg";
        sound.volume = 0.6;
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
