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
    t = +new Date();
    dt += (t-old_time);
    old_time = t;
    while(dt>20){
        sm.update();
        dt-= 20;
    }
    /* clearing canvas */
    canvas.width = canvas.width;
    sm.render(ctx);
    requestAnimFrame(loop);
}

function bootstrap(){

	/* global on purpose */
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	sm = new StateManager();
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
	
	// mouse functions
	document.addEventListener("mousedown",function(e) {
		x = e.clientX - canvas.offsetLeft;
		y = e.clientY - canvas.offsetTop;
	});

	/* add game states here */
	sm.addState("mainmenu", new MainMenuState());
	sm.addState("game", new GameState());

	resize();

	document.body.appendChild(canvas);

	/* start the game */
	sm.changeState("mainmenu");
	requestAnimFrame(loop);
}

/* TODO: implement this so that the game resizes with the browser on resize */
function resize(e){
	if(window.innerWidth/window.innerHeight > 16/9){
		GU = (window.innerHeight/9);
	}else{
		GU = (window.innerWidth/16);
	}
	canvas.width = 16*GU;
	canvas.height = 9*GU;
	canvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
}

window.onresize = resize;