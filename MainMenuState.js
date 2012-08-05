function MainMenuState(){
	this.bgtile = new Image();
}

MainMenuState.prototype.init = function(){
	this.bgtile.src = "gfx/bgtile.gif";
	this.bgX = 0;
	this.bgY = 0;
}
MainMenuState.prototype.pause= function(){}
MainMenuState.prototype.resume= function(){}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,16*GU,9*GU);

	/* TODO: scale this, maybe? */ 
	for(var x=0;x<17*GU;x+=this.bgtile.width){
		for(var y=0;y<10*GU;y+=this.bgtile.height){
			ctx.drawImage(this.bgtile,x-this.bgX,y-this.bgY);
		}
	}

	ctx.fillStyle = "white";
	ctx.font = (GU/2)+"px Arial";
	ctx.fillText("This is the main menu. Press enter to play",GU,GU);
}

MainMenuState.prototype.update = function(){
	if(KEYS[13]){
		sm.changeState("game");
	}	

	this.bgX = (GU/100+this.bgX)%this.bgtile.width;
	this.bgY = (GU/100+this.bgY)%this.bgtile.height;
}
