/// <reference path="Interface/Steppable.ts"/>

module HG
{
    export enum InputStatus
    {
        NONE,
        UP,
        DOWN,
        PRESSED,
        RELEASED
    }
    
    export class InputGroup
    {
        public currentStatus : InputStatus = InputStatus.UP;
        public pendingStatus : InputStatus = InputStatus.UP;
        
        
        constructor(
            public name : string,
            public keys : Array<number>
        ) { };
    }
    
    export class Input implements HG.Interface.Steppable
    {
        
        /**
         * Whether or not the iframe in which the game is embedded currently holds
         * the focus in the browser window.
         */
        private _isFocussed : boolean;
        
        /**
         * List of all registered input groups to check for.
         */
        private groups : Array<InputGroup>;
        
        
        constructor() {
            this._isFocussed = true;
            this.groups = new Array<InputGroup>();
            
            // Register keypress handlers.
            window.addEventListener("onkeydown", this.onKeyDownHandler.bind(this));
            window.addEventListener("onkeyup", this.onKeyUpHandler.bind(this));
        }
        
        /**
         * Update the active status of all registered input groups.
         * 
         * Input must be stepped before all other steppable objects.
         */
        step(delta : number) {
            // Don't step while not in focus.
            if (!this.isFocussed) { return; }
            
            // Cycle through all the registered input groups.
            for (var i : number = 0; i < this.groups.length; i++)
            {
                var group : InputGroup = this.groups[i];
                
                // If the active status is a boundary status, change to a continuous status.
                if (group.currentStatus == InputStatus.PRESSED)
                {
                    group.currentStatus = InputStatus.DOWN;
                }
                
                if (group.currentStatus == InputStatus.RELEASED)
                {
                    group.currentStatus = InputStatus.UP;
                }
                
                // Update the active status from the pending status.
                if (group.pendingStatus)
                {
                    group.currentStatus = group.pendingStatus;
                    
                    // Prevent a boundary status from being set twice by resetting.
                    group.pendingStatus = 0;
                }
            }
        }
        
        /**
         * See Input._isFocussed.
         */
        get isFocussed() : boolean {
            return this._isFocussed;
        }
        
        /**
         * Register a new input group with the input handler.
         */
        registerGroup(group : InputGroup) : void {
            this.groups.push(group);
        }
        
        /**
         * Update the status of all input groups which contain the relevant key.
         */
        private onKeyDownHandler(event : KeyboardEvent) : void {
            // Search for groups containing the pressed key.
            for (var i : number = 0; i < this.groups.length; i++)
            {
                var group : InputGroup = this.groups[i];
                if (group.keys.indexOf(event.keyCode) > -1)
                {
                    // Was the key just pressed, or is it held down.
                    group.pendingStatus = (group.currentStatus == InputStatus.RELEASED
                                        || group.currentStatus == InputStatus.UP)
                        ? InputStatus.PRESSED
                        : InputStatus.DOWN;
                }
            }
        }
        
        /**
         * Update the status of all input groups which contain the relevant key.
         */
        private onKeyUpHandler(event : KeyboardEvent) : void {
            // Search for groups containing the released key.
            for (var i : number = 0; i < this.groups.length; i++)
            {
                var group : InputGroup = this.groups[i];
                if (group.keys.indexOf(event.keyCode) > -1)
                {
                    // This event only triggers immediately after the key is released.
                    group.pendingStatus = InputStatus.RELEASED;
                }
            }
        }
    }
}
