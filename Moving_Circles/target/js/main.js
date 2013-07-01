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
            function Particle(stageProp) {
                        _super.call(this);
                this.stageProp = stageProp;
                this.position = new createjs.Point(0, 0);
                var r = Math.random() * 255 >> 0;
                var g = Math.random() * 255 >> 0;
                var b = Math.random() * 255 >> 0;
                var size = 8 + Math.floor(Math.random() * 5);
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
            Particle.prototype.update = function () {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                if(this.x < -50) {
                    this.x = this.stageProp.width + 50;
                }
                if(this.y < -50) {
                    this.y = this.stageProp.height + 50;
                }
                if(this.x > this.stageProp.width + 50) {
                    this.x = -50;
                }
                if(this.y > this.stageProp.height + 50) {
                    this.y = -50;
                }
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
                window.addEventListener("resize", this.onResizeHandler.bind(this), false);
                window.addEventListener("orientationchange", this.onResizeHandler.bind(this), false);
                this.particles = [];
                for(var i = 0; i < 50; i++) {
                    var p = new com.goldenratio.Particle(this.stageProp);
                    this.stage.addChild(p);
                    p.init();
                    this.particles.push(p);
                }
                this.onResizeHandler(null);
            }
            Main.prototype.onLoopHL = function (event) {
                for(var i = 0; i < this.particles.length; i++) {
                    this.particles[i].update();
                }
                if(this.stage) {
                    this.stage.update();
                }
            };
            Main.prototype.onResizeHandler = function (event) {
                var gameWidth = window.innerWidth;
                var gameHeight = window.innerHeight;
                var originalRatio = 640 / 480;
                var newRatio = gameWidth / gameHeight;
                if(newRatio > originalRatio) {
                    gameWidth = gameHeight * originalRatio;
                    this.stage.canvas.style.height = gameHeight + "px";
                    this.stage.canvas.style.width = gameWidth + "px";
                } else {
                    gameHeight = gameWidth / originalRatio;
                    this.stage.canvas.style.height = gameHeight + "px";
                    this.stage.canvas.style.width = gameWidth + "px";
                }
                var gameArea = document.getElementById("gameArea");
                gameArea.style.width = gameWidth + "px";
                gameArea.style.height = gameHeight + "px";
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
