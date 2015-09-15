/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Addable.ts"/>
/// <reference path="Interface/Drawable.ts"/>
/// <reference path="Interface/Steppable.ts"/>
/// <reference path="Entity.ts"/>
/// <reference path="Game.ts"/>
/// <reference path="Pair.ts"/>

module HG
{
    export class State extends PIXI.Container
    implements Interface.Steppable, Interface.Addable
    {        
        /**
         * A reference to the game object which contains the state. 
         */
        game : HG.Game;
        
        
        /**
         * Initialise data members.
         */
        constructor() {
            super();
            
            this.game = null;
        }
        
        /**
         * Called when the state is loaded in the game.
         */
        added() : void { /* Abstract method. */ };
        
        /**
         * Called once per game logic loop.
         */
        step(delta : number) : void {
            for (var i = 0; i < this.children.length; i++) {
                // Only proper entities can be stepped.
                if (this.children[i] instanceof Entity) {
                    (<Entity> this.children[i]).step(delta);
                }
            }
        }
        
        /**
         * Called when the state is removed from the game.
         */
        removed() : void { /* Abstract method. */ };
    }
}
