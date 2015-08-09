/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Steppable.ts"/>

module HG
{
    export class State extends PIXI.Container implements Interface.Steppable
    {
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
}
