// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};


function GameState(){
	this.event_name = "..";
	this.bgtile = new Image();
    loaded++;
    this.bgtile.onload = function(){ loaded--; }
	this.difficulty = 1;
	this.difficultyIncrement = 2;
	this.difficultyRating = 100;
	this.difficultyTimer = 300;
	this.gt = +new Date();
	this.dgt = 0;
	this.ogt = +new Date();
	this.event_name = "..";
	this.delta = 0;
	this.points = 0;
	this.events = ["click",
				"dblclick",
				"mousewheel",
				"contextmenu",
				"cut",
				"paste",
				"copy",
				"beforeunload",
				"resize",
				"keypress"];
	this.objects = [];
	this.OSDObjects = [];
    this.ps = new ParticleSystem();
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
		"mousewheel": function(e){for(var i in that.objects){if(that.objects[i].type=="mousewheel"){that.objects[i].complete();break;}}},
		"DOMMouseScroll": function(e){for(var i in that.objects){if(that.objects[i].type=="mousewheel"){that.objects[i].complete();break;}}},
		"contextmenu": function(e){for(var i in that.objects){if(that.objects[i].type=="contextmenu"){that.objects[i].complete();break;}}},
		"keypress": function(e){for(var i in that.objects){if(that.objects[i].type=="keypress"){ that.objects[i].complete();break;}}},
	};
	this.winlisteners = {
		"cut": function(e){for(var i in that.objects){if(that.objects[i].type=="cut"){that.objects[i].complete();break;}}},
		"paste": function(e){for(var i in that.objects){if(that.objects[i].type=="paste"){that.objects[i].complete();break;}}},
		"copy": function(e){for(var i in that.objects){if(that.objects[i].type=="copy"){that.objects[i].complete();break;}}},
		"beforeunload": function(e){for(var i in that.objects){if(that.objects[i].type=="beforeunload"){ that.objects[i].complete();break;}}var m="Good, now cancel the refresh to continue!";e=e||window.event;if(e)e.returnValue=m;return m},
		"resize": function(e){for(var i in that.objects){if(that.objects[i].type=="resize"){ that.objects[i].complete();break;}}}
	};
}
GameState.prototype.pause = function(){
	// Remove event listeners
	for(var i in this.doclisteners){
		document.removeEventListener(i,this.doclisteners[i]);
	}
	for(var i in this.winlisteners){
		window.removeEventListener(i,this.winlisteners[i]);
	}

    this.cutpastehack.outerHTML = "";
}
GameState.prototype.resume = function(){
	// Accept game state
	mm.changeState("game");

    document.querySelector('.gh-follow').style.display = 'none';

    this.ps = new ParticleSystem();
	
    this.cutpastehack = document.createElement("textarea");
    this.cutpastehack.value = "cut paste area, if you need it!";
    this.cutpastehack.style.position = "fixed";
    this.cutpastehack.style.zIndex = "99999";
    this.cutpastehack.style.bottom = "0";
    this.cutpastehack.style.left= "0";
    this.cutpastehack.style.background = "rgba(0,0,0,0.5)";
    this.cutpastehack.style.color = "white";
    document.body.appendChild(this.cutpastehack);

	// Resume event listeners
	for(var i in this.doclisteners){
		document.addEventListener(i,this.doclisteners[i]);
	}
	for(var i in this.winlisteners){
		window.addEventListener(i,this.winlisteners[i]);
	}

	// Reset a bunch of variables
	this.objects = [];
	this.OSDObjects = [];
	this.bgX = 0;
	this.bgY = 0;
	this.delta = 0;
	this.difficulty = 0;
	this.x = 0;
	this.y = 0;
	this.points = 0;
}

GameState.prototype.randomEvent = function() {
	var result = Math.floor((Math.random()*this.events.length-1)+1);
	var something = this.events[result];
	return something;
}

GameState.prototype.increaseDifficulty = function() {
	this.difficulty += this.difficultyIncrement++;
	this.difficultyRating = 100-(Math.floor(Math.log(this.difficulty*256)*4));
	
	if(this.dgt <= 0) this.dgt = 1;
	this.difficultyTimer += Math.floor(Math.log(this.dgt)/2);
	this.dgt = 0;
}

GameState.prototype.render = function(ctx){
	ctx.save();
	ctx.translate(8*GU,4.5*GU);
	var scaler = 1+0.01*Math.sin(songTime*Math.PI*2/0.48);
	ctx.scale(scaler,scaler);
	ctx.translate(-8*GU,-4.5*GU);
	for(var x=0;x<16*GU+this.bgtile.width;x+=this.bgtile.width){
		for(var y=0;y<9*GU+this.bgtile.width;y+=this.bgtile.height){
			ctx.drawImage(this.bgtile,x-this.bgX,y-this.bgY);
		}
	}
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "black";
	ctx.globalAlpha = 0.7*(0.25+0.25*(1+Math.sin(songTime*Math.PI*2/0.48/32)));
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.restore();
	ctx.fillStyle = "white";
	ctx.font = (GU/2)+"px BebasNeue";
	
	for(var x in this.objects) this.objects[x].render(ctx);
    this.ps.render(ctx);
	for(var x in this.OSDObjects) this.OSDObjects[x].render(ctx);

    if(this.points){
            ctx.save();
            ctx.fillStyle = "#e19400";
            ctx.globalCompositeOperation = "lighter";
        if(this.points > 20){
            var height = (this.points-20)*0.01/16*9 + 0.01*Math.sin(songTime*2*Math.PI/0.48);
            ctx.fillRect(15.5*GU-(height/2)*14.5*GU, 0.5*GU,(height/2)*14.5*GU,0.2*GU);
            ctx.fillRect(15.5*GU,0.5*GU, 0.2*GU,8*GU);
        }else{
            var height = this.points*0.1 + 0.01*Math.sin(songTime*2*Math.PI/0.48);
            ctx.fillRect(15.5*GU,0.5*GU+(1-height/2)*8*GU, 0.2*GU,(height/2)*8*GU);
        }
            ctx.restore();
    }
}

GameState.prototype.update = function(){
    this.ps.update();
	// Timer
	this.gt = +new Date();
	this.dgt += (this.gt-this.ogt);
	this.ogt = this.gt;
	
    this.cutpastehack.focus();
	if(KEYS[27]){
		sm.changeState("mainmenu");
	}

	this.bgX = ((this.difficulty/2+GU)/100+this.bgX)%this.bgtile.width;
	this.bgY = ((this.difficulty/2+GU)/100+this.bgY)%this.bgtile.height;
	
	if(this.delta++ >= this.difficultyRating) {
		this.event_name = this.randomEvent();
		var eo = new EventObject(1+Math.random()*14,1+Math.random()*6,this.difficultyTimer,this.event_name);
		this.objects.push(eo);
		this.delta = 0;
	}

	for(var i=0;i<this.OSDObjects.length;i++){
		this.OSDObjects[i].update();
		if(this.OSDObjects[i].timeleft <= 0){
			Array.remove(this.OSDObjects,i--);
		}
	}
	for(var i=0;i<this.objects.length;i++){
		this.objects[i].update();
		if(this.objects[i].isComplete){
			/* TODO: give player points or something */
			sfxm.playRandomAnnouncer();
            this.ps.explode(this.objects[i].x,this.objects[i].y);
			this.increaseDifficulty();
			this.points++;
			if(this.points % 5 == 0){
				this.OSDObjects.push(new OSDObject(8,4.5, 100, this.points+" points!"));
                this.ps.explode(8,4.5);
                this.ps.explode(8,4.5);
                this.ps.explode(0,0);
                this.ps.explode(16,0);
                this.ps.explode(16,9);
                this.ps.explode(0,9);
				sfxm.play("levelup");
			}
			Array.remove(this.objects,i--);
		} else if(this.objects[i].timeleft <= 0){
			/* TODO: the player loses a life or the game */
            sm.changeState("mainmenu");
            sm.activeState.message = "Final score: "+this.points+" points!";
			Array.remove(this.objects,i--);
		}
	}
}
