/// <reference path="../typings/pixi/pixi.d.ts"/>

var Game = Game || {};

Game.begin = function ()
{
    Game.container = new PIXI.Container();
    Game.renderer = PIXI.autoDetectRenderer(
        800,
        600,
        {view: document.getElementById('game-canvas')}
    );
    
    requestAnimationFrame(Game.update);
}

Game.update = function ()
{
    Game.renderer.render(Game.container);
    
    requestAnimationFrame(Game.update);
}
