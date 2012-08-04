function MainMenuState(){

}

MainMenuState.prototype.init = function(){}
MainMenuState.prototype.pause= function(){}
MainMenuState.prototype.resume= function(){}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,16*GU,9*GU);
	ctx.fillStyle = "black";
	ctx.font = (GU/2)+"px Arial";
	ctx.fillText("This is the main menu. press enter to play",100,100);
}

MainMenuState.prototype.update = function(){
	if(KEYS[13]){
		sm.changeState("game");
	}	
}
