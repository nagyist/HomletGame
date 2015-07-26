/// <reference path="../typings/pixi/pixi.d.ts"/>

var Game = Game || {};

/** Rate at which to update logic in steps per second. */
Game.steprate = 60;

/**
 * Set up the game state and initialise pixi.js.
 */
Game.begin = function ()
{
    var canvas = document.getElementById('game-canvas');
    
    // Initialise pixi.js objects, including embedding the renderer in the HTML canvas.
    Game.container = new PIXI.Container();
    Game.renderer = PIXI.autoDetectRenderer(1, 1, {view: canvas});
    Game.resize();
    
    // Bootstrap the render loop.
    requestAnimationFrame(Game.render);
    // Bootstrap the logic update loop.
    setTimeout(Game.step, 1000 / Game.steprate);
}

/**
 * Render any objects in the pixi container.
 */
Game.render = function ()
{
    Game.renderer.render(Game.container);
    
    requestAnimationFrame(Game.render);
}

/**
 * Main game logic loop.
 */
Game.step = function ()
{
    // TODO: Game logic goes here.
    
    setTimeout(Game.step, 1000 / Game.steprate);
}

/**
 * Resize the renderer based on the broswer window size.
 */
 Game.resize = function ()
 {     
     Game.renderer.resize(window.innerWidth, window.innerHeight);
     Game.renderer.view.style.width = window.innerWidth + 'px';
     Game.renderer.view.style.height = window.innerHeight + 'px';
     console.log(window.innerWidth);
 }
