/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Interface/Addable.ts"/>
/// <reference path="Interface/Drawable.ts"/>
/// <reference path="Interface/Steppable.ts"/>
/// <reference path="Entity.ts"/>

module HG
{
    export class State extends PIXI.Container
    implements Interface.Steppable, Interface.Addable, Interface.Container, Interface.Drawer
    {
        /**
         * Array to hold entities currently added to the state.
         */
        private entities : Array<Entity>;
        
        
        /**
         * Initialise data members.
         */
        constructor() {
            super();
            
            this.entities = new Array<Entity>();
        }
        
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
         * Add an entity to be stepped and rendered while the state is loaded.
         * Throw an error if the entity is already added.
         */
        add(subject : Entity) : void {
            if (this.contains(subject)) {
                throw Error("Attempted to add entity already added to state.")
            } else {
                this.entities.push(subject);
            }
        }
        
        /**
         * Remove an entity from the state. Throw an error if the entity is
         * not added to the state.
         */
        remove(subject : Entity) : void {
            if (!this.contains(subject)) {
                throw Error("Attempted to remove an entity not added to state.")
            } else {
                var index = this.entities.indexOf(subject);
                this.entities.splice(index, 1);
            }
        }
             
        /**
         * Return whether the state already contains an entity.
         */
        contains(subject : Entity) : boolean {
            return (this.entities.indexOf(subject) > -1);
        }
        
        /**
         * Called to notify the change of the DisplayObject associated with
         * the given entity. Throws an error if the entity is not added to
         * the state already. 
         */
        notifyDisplayObjectChanged(subject : Entity) : void {
            // TODO: Implement this.
        }
    }
}
