/// <reference path="../typings/pixi/pixi.d.ts"/>

class State extends PIXI.Container
{    
    constructor() {
        super();
    }
    
    /**
     * Called when the state is loaded in the game.
     */
    load() {};
    
    /**
     * Called once per game logic loop.
     */
    step(delta : number) {
        // TODO: step entities individually.
    }
}
