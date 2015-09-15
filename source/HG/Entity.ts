/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Addable.ts"/>
/// <reference path="Interface/Drawable.ts"/>
/// <reference path="Interface/Steppable.ts"/>

module HG
{
    export class Entity extends PIXI.Container
    implements Interface.Steppable, Interface.Addable
    {
        /**
         * Called when the entity is added to a state.
         */
        added() : void { /* Abstract method. */ }
        
        /**
         * Called once per game logic loop.
         */
        step(delta : number) : void { /* Abstract method. */ }
        
        /**
         * Called when the entity is removed from the state,
         * or when the state is unloaded from the game.
         */
        removed() : void { /* Abstract method. */ }
        
        /**
         * Return a reference to the display object used for rendering. 
         */
        get displayObject() : PIXI.DisplayObject {
            return this.getChildAt(0);
        }
        
        /**
         * Set the display object to use for rendering.
         */
        set displayObject(value : PIXI.DisplayObject) {
            this.addChildAt(value, 0);
        }
    }
}
