function GameState(){
	this.x = 0;
	this.y = 0;
	
	this.event_name = "..";
	this.delta = 0;
	
	this.events = new Array("click",
							"cut",
							"refresh",
							"resize",
							"keypress");
							
	this.objects = new Array();
}

GameState.prototype.init = function(){
	EventObject.prototype.load();
	var that = this;
	that.delta = 0;
	
	// Event Listeners
	document.addEventListener("mousedown", function(e) {
		/*that.x = e.clientX - canvas.offsetLeft;
		that.y = e.clientY - canvas.offsetTop;
		that.event_name = "mousedown";
		that.delta = 0;*/
	});
	
	document.addEventListener("mouseup", function(e) {
		/*that.x = e.clientX - canvas.offsetLeft;
		that.y = e.clientY - canvas.offsetTop;
		that.event_name = "mouseup";
		that.delta = 0;*/
	});
	
	document.addEventListener("keydown", function(e) {
		/*KEYS[e.keyCode] = true;
		that.event_name = "keydown";
		that.delta = 0;*/
	});
	
	document.addEventListener("keyup", function(e) {
		/*KEYS[e.keyCode] = false;
		that.event_name = "keyup";
		that.delta = 0;*/
	});
}
GameState.prototype.pause = function(){
	// Remove event listeners
	document.removeEventListener("mousedown",this.clicklistener);
	document.removeEventListener("mouseup",this.clicklistener);
	document.removeEventListener("keydown",this.clicklistener);
	document.removeEventListener("keyup",this.clicklistener);
}
GameState.prototype.resume = function(){
	// Accept game state
	mm.changeState("game");
	
	// Resume event listeners
	this.init();
	eo = new EventObject(2,2,300,"click");
	this.objects.push(eo);
}

GameState.prototype.randomEvent = function() {
	var result = Math.floor((Math.random()*this.events.length-1)+1);
	var something = this.events[result];
	return something;
}

GameState.prototype.render = function(ctx){
	ctx.fillStyle = "blue";
	ctx.fillRect(0,0,16*GU,9*GU);
	ctx.fillStyle = "white";
	ctx.font = (GU/2)+"px Arial";
	ctx.fillText("Hello, Event Handler! I know your job is tough...",2*GU,4*GU);
	ctx.fillText("But someone has to do it.",2*GU,5*GU);
	ctx.fillText("Time between events: " + this.delta, 10*GU, 7*GU);
	ctx.fillText("Event: " + this.event_name + ".", 10*GU, 8*GU);
	
	for(var x in this.objects) this.objects[x].render(ctx);
}

GameState.prototype.update = function(){
	if(KEYS[27]){
		sm.changeState("mainmenu");
	}
	
	if(this.delta++ >= 50) {
		this.event_name = this.randomEvent();
		var random = Math.floor((Math.random()*500)+1);
		eo = new EventObject(2,2,300,this.event_name);
		this.objects.push(eo);
		this.delta = 0;
	}
	
	for(var x in this.objects) this.objects[x].update();
}
