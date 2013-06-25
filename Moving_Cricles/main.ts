/**
 * @author: Karthik VJ
 **/

///<reference path='../../../definitions/easeljs.d.ts' />
///<reference path='particle.ts' />

module com.goldenratio
{
    export class Main
    {
        private stage:createjs.Stage;
        private particles:com.goldenratio.Particle[];
        private stageProp:createjs.Rectangle;

        constructor()
        {

            console.log("main");
            var canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("slate");
            this.stage = new createjs.Stage(canvas);
            this.stageProp = new createjs.Rectangle(0, 0, 640, 480);

            createjs.Ticker.setFPS(40);
            createjs.Ticker.addEventListener("tick", this.onLoopHL.bind(this));

            this.particles = [];
            for(var i:number = 0; i < 50; i++)
            {
                var p:com.goldenratio.Particle = new com.goldenratio.Particle(this.stageProp);
                this.stage.addChild(p);
                p.init();

                this.particles.push(p);
            }


        }



        private onLoopHL(event:createjs.TickerEvent):void
        {

            for(var i:number = 0; i < this.particles.length; i++)
            {
                this.particles[i].update();
            }

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
