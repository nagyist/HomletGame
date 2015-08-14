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
        
        /**
         * Object classes which support the adding of Addable objects
         * should implement Container.
         */
         export interface Container
         {
             /**
              * Add an Addable object to the container. Should throw an error
              * if the object is already added to the container.
              */
             add(subject : Addable) : void;
             
             /**
              * Remove an Addable object from the container. Should throw
              * an error if the object is not already in the container.
              */
             remove(subject : Addable) : void;
             
             /**
              * Return the index of the Addable in the Container. Return -1
              * if it is not in the Container.
              */
             indexOf(subject : Addable) : number;
         }
    }
}
