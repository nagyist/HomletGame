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
    implements Interface.Steppable, Interface.Addable, Interface.Container, Interface.Drawer
    {
        /**
         * Array to hold entities and display objects currently added to the state.
         */
        private entities : Array<Pair<Entity, PIXI.DisplayObject> >;
        
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
            
            this.entities = new Array<Pair<Entity, PIXI.DisplayObject> >();
        }
        
        /**
         * Called when the state is loaded in the game.
         */
        added() : void { /* Abstract method. */ };
        
        /**
         * Called once per game logic loop.
         */
        step(delta : number) : void {
            for (var i = 0; i < this.entities.length; i++) {
                (<Entity> this.entities[i].first).step(delta);
            }
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
            if (this.indexOf(subject) > -1) {
                throw Error("Attempted to add entity already added to state.")
            } else {
                var displayObject = subject.getDisplayObject();
                this.addChild(displayObject);
                
                var pair = new Pair<Entity, PIXI.DisplayObject>(subject, displayObject);
                this.entities.push(pair);
            }
        }
        
        /**
         * Remove an entity from the state. Throw an error if the entity is
         * not added to the state.
         */
        remove(subject : Entity) : void {
            if (this.indexOf(subject) < 0) {
                throw Error("Attempted to remove an entity not added to state.")
            } else {
                var index : number = this.indexOf(subject);
                this.removeChild(this.entities[index].second);
                this.entities.splice(index, 1);
            }
        }
             
        /**
         * Return the index of the entity in the state.
         */
        indexOf(subject : Entity) : number {
            var index : number = -1;
            for (var pair in this.entities) {
                index++;
                if (pair.first == subject) {
                    return index
                }
            }
            return -1;
        }
        
        /**
         * Called to notify the change of the DisplayObject associated with
         * the given entity. Throws an error if the entity is not added to
         * the state already. 
         */
        notifyDisplayObjectChanged(subject : Entity) : void {
            if (this.indexOf(subject) < 0) {
                throw Error("Cannot update display object for an entity not added to state.")
            } else {
                var index : number = this.indexOf(subject);
                // Remove the old display object from the PIXI container.
                this.removeChild(this.entities[index].second);
                
                var displayObject : PIXI.DisplayObject = subject.getDisplayObject();
                this.addChild(displayObject);
                this.entities[index].second = displayObject;
            }
        }
    }
}
