module HG
{
    export module Interface
    {
        /**
         * Object classes which can be added to and removed from containers should
         * implement Addable if they require to run code during these events.
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
