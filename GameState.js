function GameState(){

}

GameState.prototype.init = function(){}
GameState.prototype.pause= function(){}
GameState.prototype.resume= function(){
	mm.changeState("game");
}

GameState.prototype.render = function(ctx){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,16*GU,9*GU);
	ctx.fillStyle = "black";
	ctx.font = (GU/2)+"px Arial";
	ctx.fillText("This is the actual game, yo! ESC to go back",2*GU,4*GU);
}

GameState.prototype.update = function(){
	if(KEYS[27]){
		sm.changeState("mainmenu");
	}	
}
