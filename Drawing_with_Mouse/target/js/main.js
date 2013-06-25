var com;
(function (com) {
    (function (goldenratio) {
        var Main = (function () {
            function Main() {
                console.log("main");
                var canvas = document.getElementById("slate");
                this.stage = new createjs.Stage(canvas);
                createjs.Ticker.setFPS(60);
                this.init();
            }
            Main.prototype.init = function () {
                this.lineGraphics = new createjs.Graphics();
                var shape = new createjs.Shape(this.lineGraphics);
                this.stage.addChild(shape);
                this.stage.addEventListener("stagemousedown", this.onStageMouseDown.bind(this));
                this.stage.addEventListener("stagemouseup", this.onStageMouseUp.bind(this));
                createjs.Ticker.addEventListener("tick", this.onLoopHandler.bind(this));
            };
            Main.prototype.onStageMouseDown = function (event) {
                console.log("down");
                if(!this.stage) {
                    console.log("no stage..");
                    return;
                }
                var pos = new createjs.Point(event.stageX, event.stageY);
                this.lineGraphics.clear();
                this.lineGraphics.moveTo(pos.x, pos.y);
                this.lineGraphics.setStrokeStyle(7);
                this.lineGraphics.beginStroke("#ff0000");
                this.stage.removeAllEventListeners("stagemousedown");
                console.log(event.target.hasEventListener("stagemousedown"));
                this.stage.addEventListener("stagemousemove", this.onStageMouseMove.bind(this));
            };
            Main.prototype.onStageMouseUp = function (event) {
                console.log("up");
                this.stage.removeAllEventListeners("stagemousemove");
                this.stage.addEventListener("stagemousedown", this.onStageMouseDown.bind(this));
                this.lineGraphics.endStroke();
            };
            Main.prototype.onStageMouseMove = function (event) {
                var pos = new createjs.Point(event.stageX, event.stageY);
                this.lineGraphics.lineTo(pos.x, pos.y);
            };
            Main.prototype.onLoopHandler = function (event) {
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
