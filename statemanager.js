
function StateManager(){
	this.states = {};
	this.activeState;
}

StateManager.prototype.addState = function(name, state){
	state.init();
	this.states[name] = state;
}

StateManager.prototype.changeState = function(name){
	if(this.activeState) this.activeState.pause();
	this.activeState = this.states[name];
	this.activeState.resume();
}

StateManager.prototype.render = function(ctx){
	this.activeState.render(ctx);
}

StateManager.prototype.update = function(){
	this.activeState.update();
}
