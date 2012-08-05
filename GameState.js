function GameState(){

}

GameState.prototype.init = function(){}
GameState.prototype.pause = function(){}
GameState.prototype.resume = function(){}

GameState.prototype.render = function(ctx){
	ctx.fillStyle = "blue";
	ctx.fillRect(0,0,16*GU,9*GU);
	ctx.fillStyle = "white";
	ctx.font = (GU/2)+"px Arial";
	ctx.fillText("Hello, Event Handler! I know your job is tough...",2*GU,4*GU);
	ctx.fillText("But someone has to do it.",2*GU,5*GU);
	ctx.fillText("You clicked at " + x + ", " + y + ".", 2*GU, 6*GU);
}

GameState.prototype.update = function(){
	if(KEYS[27]){
		sm.changeState("mainmenu");
	}
	
	ctx.fillText("You clicked at " + x + ", " + y + ".", 2*GU, 6*GU);
}
