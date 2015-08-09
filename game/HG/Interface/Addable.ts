module HG
{
    export module Interface
    {
        /**
         * All object classes which are updated regularly by the game logic
         * loop should implement the Steppable interface.
         */
        export interface Addable
        {
            /**
             * Called when the object is added to its container.
             */
            added() : void;
            
            /**
             * Called when the object is removed from its container.
             */
            removed() : void;
        }
    }
}
