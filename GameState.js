// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};


function GameState(){
	this.x = 0;
	this.y = 0;

	this.bgtile = new Image();
	
	this.difficulty = 0;

	this.event_name = "..";
	this.delta = 0;
	
	this.events = new Array("click",
				"dblclick",
				"cut",
				"paste",
				"copy",
				"beforeunload",
				"resize",
				"keypress");
							
	this.objects = new Array();
}

GameState.prototype.init = function(){
	this.bgtile.src = "gfx/gamebgtile.gif";
	this.bgX = 0;
	this.bgY = 0;
	EventObject.prototype.load();
	var that = this;
	that.delta = 0;
	
	// Event Listeners
	
	this.doclisteners = {
		"click": function(e){for(var i in that.objects){if(that.objects[i].type=="click"){that.objects[i].complete();break;}}},
		"dblclick": function(e){for(var i in that.objects){if(that.objects[i].type=="dblclick"){that.objects[i].complete();break;}}},
		"cut": function(e){for(var i in that.objects){if(that.objects[i].type=="cut"){that.objects[i].complete();break;}}},
		"paste": function(e){for(var i in that.objects){if(that.objects[i].type=="paste"){that.objects[i].complete();break;}}},
		"copy": function(e){for(var i in that.objects){if(that.objects[i].type=="copy"){that.objects[i].complete();break;}}},
		"keypress": function(e){for(var i in that.objects){if(that.objects[i].type=="keypress"){ that.objects[i].complete();break;}}},
	};
	this.winlisteners = {
		"beforeunload": function(e){for(var i in that.objects){if(that.objects[i].type=="beforeunload"){ that.objects[i].complete();break;}}return "Good, now cancel the refresh to continue!"},
		"resize": function(e){for(var i in that.objects){if(that.objects[i].type=="resize"){ that.objects[i].complete();break;}}}
	};


	//document.addEventListener("mousedown", function(e) {
		/*that.x = e.clientX - canvas.offsetLeft;
		that.y = e.clientY - canvas.offsetTop;
		that.event_name = "mousedown";
		that.delta = 0;*/
	//});
	
	//document.addEventListener("mouseup", function(e) {
		/*that.x = e.clientX - canvas.offsetLeft;
		that.y = e.clientY - canvas.offsetTop;
		that.event_name = "mouseup";
		that.delta = 0;*/
	//});
	
	//document.addEventListener("keydown", function(e) {
		/*KEYS[e.keyCode] = true;
		that.event_name = "keydown";
		that.delta = 0;*/
	//});
	
	//document.addEventListener("keyup", function(e) {
		/*KEYS[e.keyCode] = false;
		that.event_name = "keyup";
		that.delta = 0;*/
	//});
}
GameState.prototype.pause = function(){
	// Remove event listeners
	for(var i in this.doclisteners){
		document.removeEventListener(i,this.doclisteners[i]);
	}
	for(var i in this.winlisteners){
		window.removeEventListener(i,this.winlisteners[i]);
	}
}
GameState.prototype.resume = function(){
	// Accept game state
	mm.changeState("game");
	
	// Resume event listeners
	for(var i in this.doclisteners){
		document.addEventListener(i,this.doclisteners[i]);
	}
	for(var i in this.winlisteners){
		window.addEventListener(i,this.winlisteners[i]);
	}
}

GameState.prototype.randomEvent = function() {
	var result = Math.floor((Math.random()*this.events.length-1)+1);
	var something = this.events[result];
	return something;
}

GameState.prototype.render = function(ctx){

	for(var x=0;x<16*GU+this.bgtile.width;x+=this.bgtile.width){
		for(var y=0;y<9*GU+this.bgtile.width;y+=this.bgtile.height){
			ctx.drawImage(this.bgtile,x-this.bgX,y-this.bgY);
		}
	}
	ctx.save();
	ctx.fillStyle = "black";
	ctx.globalAlpha = 0.7*(0.25+0.25*(1+Math.sin(songTime*Math.PI*2/0.48/32)));
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.restore();
	ctx.fillStyle = "white";
	ctx.font = (GU/2)+"px Arial";
	/*
	ctx.fillText("Hello, Event Handler! I know your job is tough...",2*GU,4*GU);
	ctx.fillText("But someone has to do it.",2*GU,5*GU);
	ctx.fillText("Time between events: " + this.delta, 10*GU, 7*GU);
	ctx.fillText("Event: " + this.event_name + ".", 10*GU, 8*GU);
	*/
	
	for(var x in this.objects) this.objects[x].render(ctx);
}

GameState.prototype.update = function(){
	if(KEYS[27]){
		sm.changeState("mainmenu");
	}

	this.bgX = ((this.difficulty+GU)/100+this.bgX)%this.bgtile.width;
	this.bgY = ((this.difficulty+GU)/100+this.bgY)%this.bgtile.height;
	
	if(this.delta++ >= 100-this.difficulty) {
		this.event_name = this.randomEvent();
		var random = Math.floor((Math.random()*500)+1);
		var eo = new EventObject(1+Math.random()*14,1+Math.random()*7,300,this.event_name);
		this.objects.push(eo);
		this.delta = 0;
	}
	
	for(var i=0;i<this.objects.length;i++){
		this.objects[i].update();
		if(this.objects[i].isComplete){
			/* TODO: give player points or something */
			sfxm.playRandom();
			this.difficulty++;
			Array.remove(this.objects,i--);
		} else if(this.objects[i].timeleft <= 0){
			/* TODO: the player loses a life or the game */
			Array.remove(this.objects,i--);
		}
	}
}
