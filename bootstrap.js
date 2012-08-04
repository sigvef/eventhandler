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
    dt += (t-old_time);
    old_time = t;
    while(dt>20){
        sm.update();
        dt-= 20;
    }
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
		keys[e.keycode] = true;
	});

	document.addEventListener("keydown",function(e){
		keys[e.keycode] = false;
	});

	/* add game states here */
	sm.addState("mainmenu", new MainMenuState());

	resize();

	document.body.appendChild(canvas);

	/* start the game */
	sm.changeState("mainmenu");
	requestAnimFrame(loop);
}

/* TODO: implement this so that the game resizes with the browser on resize */
function resize(){

}

