/// <reference path="typings/pixi/pixi.d.ts"/>
/// <reference path="HG/Game.ts"/>
/// <reference path="HG/State.ts"/>

class TestEntity extends HG.Entity
{
    public graphic : PIXI.Graphics;
    
    
    constructor(pos : Point) {
        super();
        
        this.graphic = new PIXI.Graphics();
        
        this.graphic.beginFill(0xFF0000);
        this.graphic.moveTo(0, 0);
        this.graphic.lineTo(100, 0);
        this.graphic.lineTo(0, 100);
        this.graphic.lineTo(0, 0);
        this.graphic.endFill();
        
        this.graphic.position.x = pos.first;
        this.graphic.position.y = pos.second;
    }
    
    step(delta : number) : void {
        this.graphic.position.x += delta * 0.01;
        
        super.step(delta);
    }
    
    getDisplayObject() : PIXI.DisplayObject {
        return this.graphic;
    }
}

class TestState extends HG.State
{
    private graphic : PIXI.Graphics;
    
    added() : void {
        var entity : TestEntity = new TestEntity(new Point(50, 50));
        this.add(entity);
    }
}


/**
 * Main entry point for test game.
 */
function test() : void {
    var game : HG.Game = new HG.Game();
    game.setState(new TestState());
}
