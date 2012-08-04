function MainMenuState(){

}

MainMenuState.prototype.init = function(){}
MainMenuState.prototype.pause= function(){}
MainMenuState.prototype.resume= function(){}

MainMenuState.prototype.render = function(ctx){
	ctx.fillStyle = "black";
	ctx.fillText("This is the main menu. press enter to play",0,0);
}

MainMenuState.prototype.update = function(){
	if(KEYS[13]){
		sm.changeState("game");
	}	
}
