/// <reference path="../typings/pixi/pixi.d.ts"/>

class Game
{
    /**
     * Rate at which to update logic in steps per second.
     */
    private steprate : number = 60;
    
    /**
     * Currently loaded game container.
     * Only this container will be updated and rendered while active.
     * The container should be changed using the setContainer method.
     */
    private container : PIXI.Container;
    
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
        this.setContainer(new PIXI.Container());
        this.renderer = PIXI.autoDetectRenderer(1, 1, {view: <HTMLCanvasElement> canvas});
        this.resize();
        window.addEventListener("resize", this.resize, false);
        
        // Bootstrap the render loop.
        requestAnimationFrame(this.render);
        // Bootstrap the logic update loop.
        setTimeout(this.step, 1000 / this.steprate);
    }
    
    /**
     * Render any objects in the pixi container.
     */
    render()
    {
        this.renderer.render(this.container);
        
        requestAnimationFrame(this.render);
    }
    
    /**
     * Main game logic loop.
     */
    step()
    {
        // TODO: Game logic goes here.
        
        setTimeout(this.step, 1000 / this.steprate);
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
     setContainer(container : PIXI.Container)
     {
         // TODO: Create a subclass of container to allow for update functionality etc.
         
         this.container = container;
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
