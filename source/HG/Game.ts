/// <reference path="../typings/pixi/pixi.d.ts"/>
/// <reference path="Input.ts"/>
/// <reference path="State.ts"/>

module HG
{
    export class Game
    {
        /**
         * Rate at which to update logic in steps per second.
         */
        private steprate : number = 60;
        
        /**
         * Currently loaded game state.
         * Only this state will be updated and rendered while active.
         * The state should be changed using the setState method.
         */
        private state : State;
        
        /**
         * The renderer object is tied to the canvas, and is used to draw the scene.
         * The type must be any, as it is not known at compile time whether the
         * target system supports a WebGL renderer, or simply a JS canvas renderer. 
         */
        private renderer : any;
        
        /**
         * The input object handles the Javascript input events and allows the state
         * of registered input groups to be queried on the fly. Input groups are
         * collections of keys which must be registered, and are tracked by the object.
         */
        input : HG.Input;
        
        
        /**
         * Set up the game state and initialise pixi.js.
         */
        constructor(state? : State) {
            var canvas : HTMLElement = document.getElementById('game-canvas');
            
            // Initialise pixi.js objects, including embedding the renderer in the HTML canvas.
            if (state != null) {
                this.setState(new State());
            }
            this.renderer = PIXI.autoDetectRenderer(1, 1, {view: <HTMLCanvasElement> canvas});
            this.resize();
            window.addEventListener("resize", this.resize.bind(this), false);
            
            this.input = new Input();
            
            // Bootstrap the render loop.
            requestAnimationFrame(this.render.bind(this));
            // Bootstrap the logic update loop.
            setTimeout(this.step.bind(this), 1000 / this.steprate);
        }
        
        /**
         * Render any objects in the pixi state.
         */
        render() : void {
            if (this.hasState()) {
                this.renderer.render(this.state);
            }
            
            requestAnimationFrame(this.render.bind(this));
        }
        
        /**
         * Main game logic loop.
         */
        step() : void {
            var delta : number = 1000 / this.steprate;
            
            this.input.step(delta);
            
            if (this.hasState()) {
                this.state.step(delta);
            }
            
            setTimeout(this.step.bind(this), 1000 / this.steprate);
        }
        
        /**
         * Resize the renderer based on the broswer window size.
         */
         resize() : void {
             this.renderer.resize(window.innerWidth, window.innerHeight);
             this.renderer.view.style.width = window.innerWidth + 'px';
             this.renderer.view.style.height = window.innerHeight + 'px';
             console.log(window.innerWidth);
         }
         
         /**
          * Returns true if a state is currently loaded.
          */
         hasState() : boolean {
             return (this.state != null);
         }
         
         /**
          * Change the currently active game container, allowing the
          * previous container to clean up its state.
          */
         setState(state : State) : void {
             if (this.hasState()) {
                 // Clean up the previous state.
                 this.state.removed();
                 this.state.game = null;
                 this.state.destroy(true);
             }
             
             // Set the new state.
             this.state = state;
             
             // Notify the state it has been loaded.
             this.state.game = this;
             this.state.added();
         }
    }
}
