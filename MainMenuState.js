function MainMenuState(){
	this.bgtile = new Image();
    loaded++;
    this.bgtile.onload = function(){ console.log(this,"loaded");loaded--; }
	this.playbutton = new Image();
    loaded++;
    this.playbutton.onload = function(){ console.log(this,"loaded");loaded--; }
	this.eventlisteners = [];
    this.message = "";
}

MainMenuState.prototype.init = function(){
	this.bgtile.src = "gfx/bgtile.gif";
	this.playbutton.src = "gfx/play.png";
	this.bgX = 0;
	this.bgY = 0;
	this.pbX = 0;
	this.pbY = 0;
}
MainMenuState.prototype.pause= function(){
	document.removeEventListener("click",this.clicklistener);
}
MainMenuState.prototype.resume= function(){
	mm.changeState("menu");
    document.querySelector('.gh-follow').style.display = 'block';
    this.message = "";
	this.clicklistener = function(){
        /* hack for music to start on iPad */
        mm.music.play();
		sm.changeState("game");
	};
    var that = this;
    setTimeout(function(){
        document.addEventListener("click",that.clicklistener);
    }, 500);
}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,16*GU,9*GU);

	/* TODO: scale this, maybe? */ 
	for(var x=0;x<16*GU+this.bgtile.width;x+=this.bgtile.width){
		for(var y=0;y<9*GU+this.bgtile.width;y+=this.bgtile.height){
			ctx.drawImage(this.bgtile,x-this.bgX,y-this.bgY);
		}
	}

	/*
	ctx.save();
	ctx.translate(8*GU,4.5*GU);
	ctx.scale(0.01*GU, 0.01*GU);
	ctx.drawImage(this.playbutton, -this.playbutton.width/2,-this.playbutton.height/2);
	ctx.restore();
	*/
	ctx.save();
	ctx.scale(canvas.width/1920, canvas.width/1920);
	ctx.drawImage(this.playbutton,0,0);
	ctx.restore();
    ctx.save();
    ctx.translate(8*GU,8.2*GU);
    var scaler = 1+0.03*Math.sin(songTime*2*Math.PI/0.48);
    ctx.scale(scaler,scaler);
    ctx.font = (0.65*GU)+"pt BebasNeue";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(this.message,0.08*GU,0.08*GU);
    ctx.fillStyle = "#e19400";
    ctx.fillText(this.message,0,0);
    ctx.restore();
}

MainMenuState.prototype.update = function(){
	this.bgX = (GU/100+this.bgX)%this.bgtile.width;
	this.bgY = (GU/100+this.bgY)%this.bgtile.height;
}
