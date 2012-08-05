function OSDObject(x,y,time,text){
	this.x = x;
	this.y = y;
	this.timeleft = time;
	this.maxtime = time;
	this.text = text;
	this.statetimes = {
		instart:0,
		inend: Math.min(20, this.timeleft/2),
		outstart: this.timeleft-Math.min(20, this.timeleft/4),
		outend: this.timeleft
	};
}

OSDObject.prototype.update = function(){
	this.timeleft--;
}

OSDObject.prototype.render = function(ctx){
	if(this.timeleft>0){
		ctx.save();
		/* ease in */
		if(this.maxtime-this.timeleft<this.statetimes.inend){
			ctx.translate(this.x*GU, this.y*GU);
			var scaler = smoothstep(0,1,(this.maxtime-this.timeleft)/this.statetimes.inend);
			ctx.scale(scaler,scaler);
			ctx.rotate(smoothstep(0,Math.PI*2,(this.maxtime-this.timeleft)/this.statetimes.inend));	
			ctx.translate(-this.x*GU, -this.y*GU);

		/* regular */	
		}else if(this.maxtime-this.timeleft < this.statetimes.outstart){
		/* ease out */
			ctx.translate(this.x*GU, this.y*GU);
			var scaler = 1+0.1*Math.sin(songTime*2*Math.PI/0.48/2);
			ctx.scale(scaler,scaler);
			ctx.translate(-this.x*GU, -this.y*GU);
		}else if(this.maxtime-this.timeleft>this.statetimes.outstart){
			ctx.translate(this.x*GU, this.y*GU);
			ctx.scale(this.timeleft/(this.statetimes.outend-this.statetimes.outstart), this.timeleft/(this.statetimes.outend-this.statetimes.outstart));
			ctx.translate(-this.x*GU, -this.y*GU);
		}
		ctx.font = (2*GU)+"pt BebasNeue";
		ctx.globalCompositeOperation = "lighter";
		ctx.textAlign = "center";
		ctx.fillStyle = "#e19400";
		ctx.fillText(this.text,this.x*GU,this.y*GU);
		ctx.restore();
	}
}

