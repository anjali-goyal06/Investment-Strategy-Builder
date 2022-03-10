"use strict";
exports.__esModule = true;
var Future = /** @class */ (function () {
    function Future() {
    }
    Future.prototype.makePlot = function () {
        if (this.side == "BUY") {
            var x = Math.floor(this.price - 50);
            var y;
            for (var i = 0; i < 100; i++) {
                if (x <= this.price) {
                    this.plot.xCoords.push(x);
                    y = -1 * this.quantity * (this.currentPrice - this.price);
                    this.plot.yCoords.push(y);
                }
                else {
                    y = this.quantity * (this.currentPrice - this.price);
                    this.plot.yCoords.push(y);
                }
            }
        }
        else {
            if (x <= this.price) {
                this.plot.xCoords.push(x);
                y = this.quantity * (this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }
            else {
                y = -1 * this.quantity * (this.currentPrice - this.price);
                this.plot.yCoords.push(y);
            }
        }
    };
    Future.prototype.getPlot = function () {
        return this.plot;
    };
    return Future;
}());
exports["default"] = Future;
