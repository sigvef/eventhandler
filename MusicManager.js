function MusicManager(){
	this.music = new Audio();
	this.music.addEventListener("loadeddata", function(){this.play()});
	this.music.src = "audio/music.mp3";
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
	if(this.state == "menu" && this.music.currentTime > this.musictimes.menuend){
		this.music.currentTime -= this.musictimes.menulength;
	}else if(this.state == "game" && this.music.currentTime < this.musictimes.gamestart){
		this.music.currentTime = this.musictimes.gamestart;
	}
	else if(this.music.currentTime > this.musictimes.gameend){
		this.music.currentTime -= this.musictimes.gamelength;
	}
}

