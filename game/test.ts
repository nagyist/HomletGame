/// <reference path="typings/pixi/pixi.d.ts"/>
/// <reference path="HG/Game.ts"/>
/// <reference path="HG/State.ts"/>

class TestState extends HG.State
{
    private graphic : PIXI.Graphics;
    
    added() : void {
        this.graphic = new PIXI.Graphics();
        
        this.graphic.beginFill(0xFF0000);
        this.graphic.moveTo(0, 0);
        this.graphic.lineTo(100, 0);
        this.graphic.lineTo(0, 100);
        this.graphic.lineTo(0, 0);
        this.graphic.endFill();
        
        this.addChild(this.graphic);
    }
    
    step(delta : number) : void {
        this.graphic.position.x += delta * 0.01;
        
        super.step(delta);
    }
}


/**
 * Main entry point for test game.
 */
function test() : void {
    var game : HG.Game = new HG.Game();
    game.setState(new TestState());
}
