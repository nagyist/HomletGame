/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Addable.ts"/>
/// <reference path="Interface/Steppable.ts"/>

module HG
{
    export class State extends PIXI.Container implements Interface.Steppable, Interface.Addable
    {
        /**
         * Called when the state is loaded in the game.
         */
        added() : void { /* Abstract method. */ };
        
        /**
         * Called once per game logic loop.
         */
        step(delta : number) : void {
            // TODO: step entities individually.
        }
        
        /**
         * Called when the state is removed from the game.
         */
        removed() : void { /* Abstract method. */ };
    }
}
