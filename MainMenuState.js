function MainMenuState(){

}

MainMenuState.prototype.render = function(ctx){

}

MainMenuState.prototype.update = function(){
	if(KEYS[13]){
		sm.changeState("game");
	}	
}
