
function ParticleSystem(){
    this.num_particles = 0;
    this.particles = [];
    for(var i=0;i<512;i++){
        this.particles[i] = {x:0,y:0,dx:0,dy:0,t:0};
    }
}


ParticleSystem.prototype.update = function(){
    for(var i=0;i<this.num_particles;i++){
        var p = this.particles[i];
        if(p.t <= 0){
            this.num_particles--;
            var q = this.particles[this.num_particles];
            p.x = q.x;
            p.y = q.y;
            p.dx = q.dx;
            p.dy = q.dy;
            p.t = q.t;
        }else{
            p.x += p.dx;
            p.y += p.dy;
            p.dx *= 0.95;
            p.dy *= 0.95;
            p.t--;
        }
    }
}

ParticleSystem.prototype.render = function(ctx){
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for(var i=0;i<this.num_particles;i++){
        var p = this.particles[i];
        ctx.fillStyle = "rgba(32,32,32,"+Math.min(1,p.t/20)+")";
        ctx.fillRect(p.x*GU,p.y*GU,GU*0.1,GU*0.1);
    }
    ctx.restore();
}


ParticleSystem.prototype.explode = function(x,y){
    for(var i=0;i<50;i++){
        if(this.num_particles>=511) return;
        this.num_particles++;
        var p = this.particles[this.num_particles];
        p.x = x;
        p.y = y;
        p.dx = 0.5-Math.random();
        p.dy = 0.5-Math.random();
        p.t = 40;
    }
}
