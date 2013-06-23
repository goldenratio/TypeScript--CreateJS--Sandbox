/**
 * @author: Karthik VJ
 **/

///<reference path='../../../definitions/easeljs.d.ts' />

module com.goldenratio
{
    export class Main
    {

        private stage:createjs.Stage;
        private lineGraphics:createjs.Graphics;

        constructor()
        {
            console.log("main");

            var canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("slate");
            this.stage = new createjs.Stage(canvas);
            createjs.Ticker.setFPS(60);

            this.init();
        }

        private init():void
        {
            this.lineGraphics = new createjs.Graphics();
            var shape:createjs.Shape = new createjs.Shape(this.lineGraphics);
            this.stage.addChild(shape);

            this.stage.addEventListener("stagemousedown", this.onStageMouseDown.bind(this));
            this.stage.addEventListener("stagemouseup", this.onStageMouseUp.bind(this));
            createjs.Ticker.addEventListener("tick", this.onLoopHandler.bind(this));
        }

        private onStageMouseDown(event:createjs.MouseEvent):void
        {
            console.log("down");

            if(!this.stage)
            {
                console.log("no stage..");
                return;
            }

            var pos:createjs.Point = new createjs.Point(event.stageX, event.stageY);
            this.lineGraphics.clear();
            this.lineGraphics.moveTo(pos.x, pos.y);
            this.lineGraphics.setStrokeStyle(7);
            this.lineGraphics.beginStroke("#ff0000");

            //event.target.removeEventListener("stagemousedown", this.onStageMouseDown.bind(this));
            this.stage.removeAllEventListeners("stagemousedown");
            console.log(event.target.hasEventListener("stagemousedown"));

            this.stage.addEventListener("stagemousemove", this.onStageMouseMove.bind(this));

        }

        private onStageMouseUp(event:createjs.MouseEvent):void
        {
            console.log("up");
            this.stage.removeAllEventListeners("stagemousemove");
            this.stage.addEventListener("stagemousedown", this.onStageMouseDown.bind(this));

            this.lineGraphics.endStroke();

        }

        private onStageMouseMove(event:createjs.MouseEvent):void
        {
            var pos:createjs.Point = new createjs.Point(event.stageX, event.stageY);
            this.lineGraphics.lineTo(pos.x, pos.y);
        }

        private onLoopHandler(event:createjs.TickerEvent):void
        {
            if(this.stage)
            {
                this.stage.update();
            }

        }

    }
}

/////////////////////////


window.addEventListener("load", onLoad, false);
function onLoad(event)
{

    var main:com.goldenratio.Main = new com.goldenratio.Main();
}