function GameState(){

}

GameState.prototype.init = function(){}
GameState.prototype.pause= function(){}
GameState.prototype.resume= function(){}

GameState.prototype.render = function(ctx){
	ctx.fillStyle = "black";
	ctx.fillText("This is the actual game, yo! ESC to go back",100,200);
}

GameState.prototype.update = function(){
	if(KEYS[27]){
		sm.changeState("mainmenu");
	}	
}
