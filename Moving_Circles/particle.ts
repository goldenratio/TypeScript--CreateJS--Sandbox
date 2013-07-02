/**
 * @author: Karthik VJ
 **/

///<reference path='../../../definitions/easeljs.d.ts' />

module com.goldenratio
{

    export class Particle extends createjs.Container
    {

        private position:createjs.Point;
        private velocity:createjs.Point;

        constructor(public stageProp:createjs.Rectangle)
        {

            super();
            //console.log("particle..");
            this.position = new createjs.Point(0, 0);

            //Random colors
            var r:number = Math.random()*255>>0;
            var g:number = Math.random()*255>>0;
            var b:number = Math.random()*255>>0;

            var size:number = 8 + Math.floor(Math.random() * 5);

            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.beginFill(createjs.Graphics.getRGB(r, g, b));
            //this.gfx.beginRadialGradientFill(["#FF0000","#00F"], [0, 1], 100, 100, 0, 100, 100, 50);
            gfx.drawCircle(this.position.x, this.position.y, size);

            var container:createjs.Shape = new createjs.Shape(gfx);
            this.addChild(container);
            this.cache(size * -1, size * -1, size * 2, size * 2)
            this.snapToPixel = true;

            this.x = this.position.x;
            this.y = this.position.y;

        }

        public init():void
        {
            this.position.x = Math.random() * this.stageProp.width;
            this.position.y = Math.random() * this.stageProp.height;

            this.velocity = new createjs.Point(0, 0);
            this.velocity.x = Math.random() * 20 - 10;
            this.velocity.y = Math.random() * 20 - 10;

            this.x = this.position.x;
            this.y = this.position.y;
        }


        public update():void
        {
            //console.log(this.x + ", " + this.y);
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            if(this.x < -50)
                this.x = this.stageProp.width + 50;

            if(this.y < -50)
                this.y = this.stageProp.height + 50;

            if(this.x > this.stageProp.width + 50)
                this.x = -50;

            if(this.y > this.stageProp.height + 50)
                this.y = -50;
        }
    }
}