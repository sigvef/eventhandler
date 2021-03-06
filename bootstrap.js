missedGFXFrames = 0;

/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
	var v = t * t * (3 - 2 * t);
	return b * v + a * (1 - v);
};

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
        window.setTimeout(callback, 0);
    };
})();

function loop(){
    if(loaded > 0){
        canvas.width = canvas.width;
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "black";
        ctx.fillText("Loading "+loaded, 8*GU,4.5*GU);
        requestAnimFrame(loop);
        return;
    }
    t = +new Date();
    dt += (t-old_time);
    old_time = t;
    songTime = mm.music.currentTime;
    while(dt>20){
        missedGFXFrames++;
        sm.update();
        mm.update();
        dt-= 20;
    }
    /* clearing canvas */
    canvas.width = canvas.width;
	missedGFXFrames--;
    sm.render(ctx);

    /* post process scanlines */
    if(true || missedGFXFrames < 20){
    ctx.drawImage(scanlinecanvas,0,0);
    }
    
    /* post process glow */
    if(true || missedGFXFrames < 10){
	    blurcanvas.width = blurcanvas.width;
	    blurctx.scale(0.5,0.5);
	    blurctx.drawImage(canvas,0,0);
	    for(var i=0;i<4;i++){
		    glowcanvas.width = glowcanvas.width;
		    glowctx.scale(2,2);
		    glowctx.drawImage(blurcanvas,0,0);
		    blurcanvas.width = blurcanvas.width;
		    blurctx.scale(0.5,0.5);
		    blurctx.drawImage(glowcanvas,0,0);
	    }
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(glowcanvas,0,0);
    ctx.restore();
    }


    requestAnimFrame(loop);
}

function bootstrap(){

    loaded = 1;

	/* global on purpose */
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.style.zIndex = 999;
	glowcanvas = document.createElement("canvas");
	glowctx = glowcanvas.getContext("2d");
	blurcanvas = document.createElement("canvas");
	blurctx = blurcanvas.getContext("2d");
	scanlinecanvas = document.createElement("canvas");
	scanlinectx = scanlinecanvas.getContext("2d");
	
	overlay = new Image();
    loaded++;
    overlay.onload = function(){ console.log("overlay loaded");loaded--; }
	overlay.src = "gfx/overlay.png";

	sm = new StateManager();
	mm = new MusicManager();
	sfxm = new SFXManager();
	dt = 0;
	t = 0;
	time = +new Date();
	old_time = time;
	KEYS = [];
	for(var i=0;i<256;i++){
		KEYS[i] = false;
	}

	document.addEventListener("keydown",function(e){
		KEYS[e.keyCode] = true;
	});

	document.addEventListener("keyup",function(e){
		KEYS[e.keyCode] = false;
	});

	/* add game states here */
	sm.addState("mainmenu", new MainMenuState());
	sm.addState("game", new GameState());

	resize();

	document.body.appendChild(canvas);

	/* start the game */
	sm.changeState("mainmenu");
    console.log("bootstrapping loaded");
    loaded--;
	requestAnimFrame(loop);
}

function resize(e){
	if(window.innerWidth/window.innerHeight > 16/9){
		GU = (window.innerHeight/9);
	}else{
		GU = (window.innerWidth/16);
	}
	canvas.width = 16*GU;
	canvas.height = 9*GU;
	canvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";

    var gh = document.querySelector('.gh-follow');
    if(gh){
        gh.style.top = (window.innerHeight - 9*GU) /2 + 10 + 'px';
        gh.style.right = (window.innerWidth - 16*GU) /2 + 10 + 'px';
    }
	blurcanvas.width = 16*GU/2;
	blurcanvas.height = 9*GU/2;
	glowcanvas.width = 16*GU;
	glowcanvas.height = 9*GU;
	scanlinecanvas.width = 16*GU;
	scanlinecanvas.height = 9*GU;
	scanlinecanvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
	scanlinectx.fillStyle = "rgba(0,0,0,0.05)";
	for(var i=0;i<9;i++){
		scanlinectx.fillRect(0,i*GU+0.0*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.2*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.4*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.6*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.8*GU,16*GU,0.1*GU);
	}
	    scanlinectx.save();
	    scanlinectx.scale(16*GU/1920,16*GU/1920);
	scanlinectx.drawImage(overlay,0,0);
	    scanlinectx.restore();
}

window.onresize = resize;
