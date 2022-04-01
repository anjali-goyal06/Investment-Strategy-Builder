/**
 * This class is used for holding plot information wrapped in one object.
 * It has two number arrays - one for the x-coordinates of plot and other for y-coordinates of plot.
 */
export default class StrategyPlot{

    xCoords : number[];
    yCoords : number[];

    constructor(){
        this.xCoords = [];
        this.yCoords = [];
    }
}

module.exports = StrategyPlot;