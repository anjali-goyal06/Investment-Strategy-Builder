"use strict";
exports.__esModule = true;
var Options = /** @class */ (function () {
    function Options() {
    }
    Options.prototype.Add = function () {
    };
    Options.prototype.fetchPremiumFromMarketData = function () {
    };
    Options.prototype.makePlot = function () {
        //  var i = this.strikePrice - 30;
        var x = Math.floor(this.strikePrice - 50);
        var y;
        switch (this.side) {
            case "BUY CALL": {
                for (var i = 0; i < 100; i++) {
                    if (x <= this.strikePrice) {
                        this.plot.xCoords.push(x);
                        y = -(this.quantity * this.premium);
                        this.plot.yCoords.push(y);
                    }
                    else {
                        y = this.quantity * ((x - this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }
            case "BUY PUT": {
                for (var i = 0; i < 100; i++) {
                    if (x <= this.strikePrice) {
                        this.plot.xCoords.push(x);
                        y = this.quantity * ((this.strikePrice - x) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                    else {
                        y = -this.quantity * (this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }
            case "SELL CALL": {
                for (var i = 0; i < 100; i++) {
                    if (x <= this.strikePrice) {
                        this.plot.xCoords.push(x);
                        y = (this.quantity * this.premium);
                        this.plot.yCoords.push(y);
                    }
                    else {
                        y = -1 * this.quantity * ((x - this.strikePrice) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }
            case "SELL PUT": {
                for (var i = 0; i < 100; i++) {
                    if (x <= this.strikePrice) {
                        this.plot.xCoords.push(x);
                        y = -1 * this.quantity * ((this.strikePrice - x) - this.premium);
                        this.plot.yCoords.push(y);
                    }
                    else {
                        y = this.quantity * (this.premium);
                        this.plot.yCoords.push(y);
                    }
                }
            }
        }
    };
    Options.prototype.getPlot = function () {
        return this.plot;
    };
    return Options;
}());
