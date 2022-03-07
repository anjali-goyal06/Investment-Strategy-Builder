"use strict";
exports.__esModule = true;
var InvestmentStrategy = /** @class */ (function () {
    function InvestmentStrategy(jsonData) {
        //this.name = jsonData.name
    }
    InvestmentStrategy.prototype.AddSkeleton = function () {
    };
    InvestmentStrategy.prototype.AddStrategy = function () {
    };
    InvestmentStrategy.prototype.combinedPlot = function () {
        for (var i in this.instruments) {
            // let tempPlot  = i.getPlot();
        }
    };
    InvestmentStrategy.prototype.getStrategySkeleton = function () {
    };
    return InvestmentStrategy;
}());
exports["default"] = InvestmentStrategy;
