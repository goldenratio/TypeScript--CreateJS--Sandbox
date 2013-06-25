var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (goldenratio) {
        var Particle = (function (_super) {
            __extends(Particle, _super);
            function Particle(stageProp, size) {
                        _super.call(this);
                this.stageProp = stageProp;
                this.position = new createjs.Point(0, 0);
                var r = Math.random() * 255 >> 0;
                var g = Math.random() * 255 >> 0;
                var b = Math.random() * 255 >> 0;
                var gfx = new createjs.Graphics();
                gfx.beginFill(createjs.Graphics.getRGB(r, g, b));
                gfx.drawCircle(this.position.x, this.position.y, size);
                var container = new createjs.Shape(gfx);
                this.addChild(container);
                this.x = this.position.x;
                this.y = this.position.y;
            }
            Particle.prototype.init = function () {
                this.position.x = Math.random() * this.stageProp.width;
                this.position.y = Math.random() * this.stageProp.height;
                this.velocity = new createjs.Point(0, 0);
                this.velocity.x = Math.random() * 20 - 10;
                this.velocity.y = Math.random() * 20 - 10;
                this.x = this.position.x;
                this.y = this.position.y;
            };
            Particle.prototype.update = function (mousePosition) {
                var smoothSpeed = ((this.id * 0.1) - 0.1) + 0.08;
                this.x += (mousePosition.x - this.x) * smoothSpeed;
                this.y += (mousePosition.y - this.y) * smoothSpeed;
            };
            return Particle;
        })(createjs.Container);
        goldenratio.Particle = Particle;        
    })(com.goldenratio || (com.goldenratio = {}));
    var goldenratio = com.goldenratio;
})(com || (com = {}));
var com;
(function (com) {
    (function (goldenratio) {
        var Main = (function () {
            function Main() {
                console.log("main");
                var canvas = document.getElementById("slate");
                this.stage = new createjs.Stage(canvas);
                this.stageProp = new createjs.Rectangle(0, 0, 640, 480);
                createjs.Ticker.setFPS(40);
                createjs.Ticker.addEventListener("tick", this.onLoopHL.bind(this));
                this.particles = [];
                var id = 1;
                for(var i = 10; i >= 0; i--) {
                    var size = 10 + (i * 10);
                    var p = new com.goldenratio.Particle(this.stageProp, size);
                    p.id = id;
                    id += 1;
                    this.stage.addChild(p);
                    p.init();
                    this.particles.push(p);
                }
            }
            Main.prototype.onLoopHL = function (event) {
                for(var i = 0; i < this.particles.length; i++) {
                    this.particles[i].update(new createjs.Point(this.stage.mouseX, this.stage.mouseY));
                }
                if(this.stage) {
                    this.stage.update();
                }
            };
            return Main;
        })();
        goldenratio.Main = Main;        
    })(com.goldenratio || (com.goldenratio = {}));
    var goldenratio = com.goldenratio;
})(com || (com = {}));
window.addEventListener("load", onLoad, false);
function onLoad(event) {
    var main = new com.goldenratio.Main();
}
