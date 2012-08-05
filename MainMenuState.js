function MainMenuState(){
	this.bgtile = new Image();
	this.playbutton = new Image();
	this.eventlisteners = [];
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
	this.clicklistener = function(){
		sm.changeState("game");
	};
	document.addEventListener("click",this.clicklistener);
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
}

MainMenuState.prototype.update = function(){
	if(KEYS[13]){
		sm.changeState("game");
	}	

	this.bgX = (GU/100+this.bgX)%this.bgtile.width;
	this.bgY = (GU/100+this.bgY)%this.bgtile.height;
}
