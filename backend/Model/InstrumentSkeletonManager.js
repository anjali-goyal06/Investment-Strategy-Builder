"use strict";
exports.__esModule = true;
var FutureSkeleton = require("./FutureSkeleton");
var OptionSkeleton = require("./OptionSkeleton");
var StockSkeleton = require("./StockSkeleton");
/**
 * Manager Class for Instrument skeletons.
 * Has been used for implementing factory design pattern for creating appropriate instrument skeleton object.
**/
var InstrumentSkeletonManager = /** @class */ (function () {
    function InstrumentSkeletonManager() {
    }
    /**
     *  - It creates and returns the appropriate instrument skeleton object.
     * @param instrumentType - specifies the type of instrument skeleton object to be created, type = string
     * @param type
     * @param side
     * @returns IInstrumentSkeleton type object of respective instrument skelton
     */
    InstrumentSkeletonManager.prototype.createInstrument = function (instrumentType, type, side) {
        if (instrumentType.toLowerCase() == 'option') {
            return new OptionSkeleton(-1, side, type);
        }
        else if (instrumentType.toLowerCase() == 'future') {
            return new FutureSkeleton(-1, side);
        }
        else {
            return new StockSkeleton(-1, side);
        }
    };
    return InstrumentSkeletonManager;
}());
exports["default"] = InstrumentSkeletonManager;
module.exports = InstrumentSkeletonManager;
