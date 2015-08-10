/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Addable.ts"/>
/// <reference path="Interface/Drawable.ts"/>
/// <reference path="Interface/Steppable.ts"/>
/// <reference path="Entity.ts"/>

module HG
{
    export class State extends PIXI.Container
    implements Interface.Steppable, Interface.Addable, Interface.Drawer
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
        
        /**
         * Called to notify the change of the DisplayObject associated with
         * the given Entity. Throws an error if the entity is not added to
         * the state already. 
         */
        notifyDisplayObjectChanged(subject : Entity) : void {
            // TODO: Implement this.
        }
    }
}
