/// <reference path="../typings/pixi/pixi.d.ts"/>

function begin()
{
    var container = new PIXI.Container();
    var renderer = PIXI.autoDetectRenderer(
        640,
        480,
        {view: document.getElementById('game-canvas')}
    );
    
    requestAnimationFrame(update);
    
    function update()
    {
        renderer.render(container);
        
        requestAnimationFrame(update);
    }
}
