function EventObject(x,y,time, type){
	this.x = x;
	this.y = y;
	this.timeleft = time;
	this.maxtime = time;
	this.type = type;
	this.image = this.images[type];
	this.isComplete = false;
	this.statetimes = {
		instart:0,
		inend: Math.min(40, this.timeleft/2),
		outstart: this.timeleft, //this.timeleft-Math.min(20, this.timeleft/4),
		outend: this.timeleft
	};
}


EventObject.prototype.load = function(){
	var images = {};
	var types = "contextmenu dblclick click cut beforeunload resize keypress copy paste".split(" ");
	for(var i in types){
		var image = new Image();
		image.src = "gfx/events/"+types[i]+".png";
		images[types[i]] = image;
	}
	EventObject.prototype.images = images;
}


EventObject.prototype.complete = function(){
	this.isComplete = true;
}

EventObject.prototype.update = function(){
	this.timeleft--;
}

EventObject.prototype.render = function(ctx){
	if(this.timeleft>0){
		ctx.save();
		/* ease in */
		if(this.maxtime-this.timeleft<this.statetimes.inend){
			ctx.translate(this.x*GU, this.y*GU);
			ctx.scale((this.maxtime-this.timeleft)/this.statetimes.inend,(this.maxtime-this.timeleft)/this.statetimes.inend);
			ctx.rotate(3*Math.PI/2 + smoothstep(0,Math.PI*2,(this.maxtime-this.timeleft)/this.statetimes.inend));	
			ctx.translate(-this.x*GU, -this.y*GU);

		/* regular */	
		}else if(this.maxtime-this.timeleft < this.statetimes.outstart){
			ctx.translate(this.x*GU, this.y*GU);
			ctx.rotate(3*Math.PI/2);
			ctx.translate(-this.x*GU, -this.y*GU);

		/* ease out */
		}else if(this.maxtime-this.timeleft>this.statetimes.outstart){
			ctx.translate(this.x*GU, this.y*GU);
			ctx.scale(this.timeleft/(this.statetimes.outend-this.statetimes.outstart), this.timeleft/(this.statetimes.outend-this.statetimes.outstart));
			ctx.rotate(3*Math.PI/2);
			ctx.translate(-this.x*GU, -this.y*GU);
		}
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.beginPath();
		ctx.moveTo(this.x*GU,this.y*GU);
		ctx.lineTo((this.x+1)*GU,this.y*GU);
		ctx.arc(this.x*GU,this.y*GU, GU, 0,(this.timeleft/this.maxtime)*Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		var scaler = 0.25;

		ctx.save();
		ctx.translate(this.x*GU,this.y*GU);
		ctx.scale(scaler*Math.min(1,(this.maxtime-this.timeleft)/this.statetimes.inend),Math.min(1,(this.maxtime-this.timeleft)/this.statetimes.inend)*scaler);
		ctx.drawImage(this.image,-this.image.width/2,-this.image.height/2);
		ctx.font = GU+"pt BebasNeue";
		ctx.textAlign = "center";
		ctx.fillText(this.type.toUpperCase()+"!",0,5.5*GU);
		ctx.restore();
	}
}
