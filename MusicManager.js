function MusicManager(){
	this.music = new Audio();
    this.loaded = false;
    var that = this;
	this.music.addEventListener("loadeddata", function(){that.loaded = true;this.play()});
	this.music.addEventListener("canplay", function(){that.loaded = true;this.play()});
    this.music.volume = 0.4;
    if(this.music.canPlayType("mp3")){
        this.music.src = "audio/music.mp3";
    }else{
        this.music.src = "audio/music.ogg";
    }
	this.state = "menu";
	this.musictimes = {
		menustart:0,
		menuend: 15.36,
		menulength: 15.36,
		gamestart:21.12,
		gameend:120+10.56,
		gamelength: 120+10.56-23.04

	}
    document.body.appendChild(this.music);
}

MusicManager.prototype.changeState = function(state){
	this.state = state;
}

MusicManager.prototype.update = function(){
    if(this.loaded){
        if(this.state == "menu" && this.music.currentTime > this.musictimes.menuend){
            this.music.currentTime -= this.musictimes.menulength;
        }else if(this.state == "game" && this.music.currentTime < this.musictimes.gamestart){
            this.music.currentTime = this.musictimes.gamestart;
        }
        else if(this.music.currentTime > this.musictimes.gameend){
            this.music.currentTime -= this.musictimes.gamelength;
        }
    }
}

