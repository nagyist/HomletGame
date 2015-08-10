/// <reference path="../../typings/pixi/pixi.d.ts"/>

module HG
{
    export module Interface
    {
        /**
         * Object classes which can be drawn by a PIXI renderer should implement
         * this interface to expose a DisplayObject.
         */
        export interface Drawable
        {
            /**
             * Called when object is first added to a drawing container, and
             * after the object announces its DisplayObject has been replaced. 
             */
            getDisplayObject() : PIXI.DisplayObject;
        }
        
        /**
         * Object classes which container drawable objects should implement
         * this interface so that drawble objects can notify when their
         * DisplayObjects change. 
         */
        export interface Drawer
        {
            /**
             * Called to notify the change of the DisplayObject associated with
             * the given Drawable object. Should throw an error if the subject
             * Drawable is not already associated with the Drawer.
             */
            notifyDisplayObjectChanged(subject : Drawable) : void;
        }
    }
}
