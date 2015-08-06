/// <reference path="../typings/pixi/pixi.d.ts"/>

class Game
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
     * Set up the game state and initialise pixi.js.
     */
    constructor()
    {
        var canvas : HTMLElement = document.getElementById('game-canvas');
        
        // Initialise pixi.js objects, including embedding the renderer in the HTML canvas.
        this.setState(new State());
        this.renderer = PIXI.autoDetectRenderer(1, 1, {view: <HTMLCanvasElement> canvas});
        this.resize();
        window.addEventListener("resize", this.resize.bind(this), false);
        
        // Bootstrap the render loop.
        requestAnimationFrame(this.render.bind(this));
        // Bootstrap the logic update loop.
        setTimeout(this.step.bind(this), 1000 / this.steprate);
    }
    
    /**
     * Render any objects in the pixi state.
     */
    render()
    {
        this.renderer.render(this.state);
        
        requestAnimationFrame(this.render.bind(this));
    }
    
    /**
     * Main game logic loop.
     */
    step()
    {
        this.state.step(1000 / this.steprate);
        
        setTimeout(this.step.bind(this), 1000 / this.steprate);
    }
    
    /**
     * Resize the renderer based on the broswer window size.
     */
     resize()
     {     
         this.renderer.resize(window.innerWidth, window.innerHeight);
         this.renderer.view.style.width = window.innerWidth + 'px';
         this.renderer.view.style.height = window.innerHeight + 'px';
         console.log(window.innerWidth);
     }
     
     /**
      * Change the currently active game container, allowing the
      * previous container to clean up its state.
      */
     setState(state : State)
     {
         if (this.state != null) {
             // Clean up the previous state.
             this.state.destroy(true);
         }
         
         // Set the new state.
         this.state = state;
         
         // Notify the state it has been loaded.
         this.state.load();
     }
}


/**
 * Variable referencing the Game object.
 */
var game : Game;


/**
 * Main entry point.
 */
function begin()
{
    game = new Game();
}
