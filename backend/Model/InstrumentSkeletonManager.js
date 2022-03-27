"use strict";
exports.__esModule = true;
var FutureSkeleton = require("./FutureSkeleton");
var OptionSkeleton = require("./OptionSkeleton");
var StockSkeleton = require("./StockSkeleton");
var InstrumentSkeletonManager = /** @class */ (function () {
    function InstrumentSkeletonManager() {
    }
    InstrumentSkeletonManager.prototype.createInstrument = function (instrumentType, type, side) {
        if (instrumentType == 'option') {
            return new OptionSkeleton(-1, side, type, -1);
        }
        else if (instrumentType == 'future') {
            return new FutureSkeleton(-1, side, -1);
        }
        else {
            return new StockSkeleton(-1, side, -1);
        }
    };
    return InstrumentSkeletonManager;
}());
exports["default"] = InstrumentSkeletonManager;
module.exports = InstrumentSkeletonManager;
