"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var getDbConnection = require('../db/dbconnect');
var Future = /** @class */ (function () {
    function Future(id, quantity, price, skeletonId, strategyId) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.instrumentSkeletonId = skeletonId;
        this.strategyId = strategyId;
    }
    Future.prototype.setId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "Select  count(*) as count from Future";
                        return [4 /*yield*/, getDbConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        response = _a.sent();
                        connection.end();
                        this.id = response[0].count + 1;
                        console.log(this.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    Future.prototype.AddDataToDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.id == -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setId()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        sql = "INSERT INTO Future (Id, Price, Quantity, FutureSkeletonId, InvestmentStrategyId) VALUES (?,?,?,?,?)";
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, getDbConnection()];
                    case 4:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [this.id, this.price, this.quantity, this.instrumentSkeletonId, this.strategyId])];
                    case 5:
                        response = _a.sent();
                        connection.end();
                        return [2 /*return*/, response];
                    case 6:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, err_1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Future.prototype.makePlot = function () {
        if (this.instrumentSkeleton.side == "BUY") {
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
    Future.count = 0;
    return Future;
}());
module.exports = Future;