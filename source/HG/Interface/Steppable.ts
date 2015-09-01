module HG
{
    export module Interface
    {
        /**
         * All object classes which are updated regularly by the game logic
         * loop should implement the Steppable interface.
         */
        export interface Steppable
        {
            /**
             * Called once per game logic loop.
             */
            step(delta : number) : void;
        }
    }
}
