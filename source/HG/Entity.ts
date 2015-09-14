/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Addable.ts"/>
/// <reference path="Interface/Drawable.ts"/>
/// <reference path="Interface/Steppable.ts"/>

module HG
{
    export class Entity
    implements Interface.Steppable, Interface.Addable, Interface.Drawable
    {
        /**
         * PIXI DisplayObject associated with this Entity for drawing purposes.
         */
        private displayObject : PIXI.DisplayObject;
        
        
        /**
         * Called when the entity is added to a state.
         */
        added() : void { /* Abstract method. */ };
        
        /**
         * Called once per game logic loop.
         */
        step(delta : number) : void { /* Abstract method. */ }
        
        /**
         * Called when the entity is removed from the state,
         * or when the state is unloaded from the game.
         */
        removed() : void { /* Abstract method. */ };
        
        /**
         * Return the PIXI DisplayObject associated with this Entity
         * for drawing purposes.
         */
        getDisplayObject() : PIXI.DisplayObject {
            return this.displayObject;
        }
        
        /**
         * Set the PIXI DisplayObject associated with this Entity
         * for drawing purposes.
         */
        protected setDisplayObject(value : PIXI.DisplayObject) {
            this.displayObject = value;
        }
    }
}
