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
var mysql = require('mysql');
var DbManager = /** @class */ (function () {
    function DbManager() {
    }
    // constructor(){
    // }
    DbManager.prototype.GetUserDetailsFromUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "Select  * from  User where Id = " + mysql.escape(id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, getDbConnection()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        response = _a.sent();
                        connection.end();
                        return [2 /*return*/, response];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DbManager.prototype.GetInstrumentsFromStrategySkeletonId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, sqlOptions, sqlFutures, sqlStocks, arr, connection, i, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = [];
                        console.log("dshjxkm");
                        sqlOptions = "select * from OptionSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
                        sqlFutures = "select * from FutureSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
                        sqlStocks = "select * from StockSkeleton where InvestmentStrategySkeletonId = " + mysql.escape(id);
                        return [4 /*yield*/, getDbConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sqlOptions)];
                    case 2:
                        arr = _a.sent();
                        for (i in arr) {
                            arr[i].segment = "option";
                            response.push(arr[i]);
                        }
                        return [4 /*yield*/, connection.query(sqlFutures)];
                    case 3:
                        arr = _a.sent();
                        for (i in arr) {
                            arr[i].segment = "future";
                            response.push(arr[i]);
                        }
                        return [4 /*yield*/, connection.query(sqlStocks)];
                    case 4:
                        arr = _a.sent();
                        for (i in arr) {
                            arr[i].segment = "stock";
                            response.push(arr[i]);
                        }
                        connection.end();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DbManager.prototype.getUserInputFromStrategySkeletonIdAndStrategyId = function (segment, InstrumentId, StrategyId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql, sql, connection, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (segment == "option") {
                            sql = "select * from Options where OptionSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
                        }
                        else if (segment == "future") {
                            sql = "select * from Future where FutureSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
                        }
                        else {
                            sql = "select * from Stock where StockSkeletonId=" + mysql.escape(InstrumentId) + " AND InvestmentStrategyId=" + mysql.escape(StrategyId);
                        }
                        console.log(sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, getDbConnection()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        response = _a.sent();
                        console.log(response);
                        connection.end();
                        return [2 /*return*/, response];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, err_2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DbManager.prototype.GetStrategySkeletonsFromUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "select Id, StrategyName from InvestmentStrategySkeleton where UserId = " + mysql.escape(id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, getDbConnection()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        response = _a.sent();
                        connection.end();
                        return [2 /*return*/, response];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, err_3];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DbManager.prototype.GetSavedStrategiesFromUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "select InvestmentStrategy.Id, Name,StockName,Ticker,ExpiryDate,userId,Description, InvestmentStrategySkeletonId from InvestmentStrategy where InvestmentStrategy.userId =  " + mysql.escape(id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, getDbConnection()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        response = _a.sent();
                        connection.end();
                        return [2 /*return*/, response];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, err_4];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DbManager.prototype.GetCountOfRecordsInDb = function (tableName) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "Select  count(*) as count from " + mysql.escape(tableName);
                        return [4 /*yield*/, getDbConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        response = _a.sent();
                        connection.end();
                        //let result = JSON.parse(JSON.stringify(response));
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DbManager.prototype.GetStrategySkeletonFromStrategyName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var OptionSql, FutureSql, StockSql, connection, OptionResponse, StockResponse, FutureResponse, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OptionSql = "select * from OptionSkeleton where InvestmentStrategySkeletonId = (select Id from InvestmentStrategySkeleton where StrategyName = " + mysql.escape(name) + ")";
                        FutureSql = "select * from FutureSkeleton where InvestmentStrategySkeletonId = (select Id from InvestmentStrategySkeleton where StrategyName = " + mysql.escape(name) + ")";
                        StockSql = "select * from StockSkeleton where InvestmentStrategySkeletonId = (select Id from InvestmentStrategySkeleton where StrategyName = " + mysql.escape(name) + ")";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, getDbConnection()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(OptionSql)];
                    case 3:
                        OptionResponse = _a.sent();
                        return [4 /*yield*/, connection.query(StockSql)];
                    case 4:
                        StockResponse = _a.sent();
                        return [4 /*yield*/, connection.query(FutureSql)];
                    case 5:
                        FutureResponse = _a.sent();
                        connection.end();
                        response = OptionResponse + StockResponse + FutureResponse;
                        return [2 /*return*/, response];
                    case 6:
                        err_5 = _a.sent();
                        return [2 /*return*/, err_5];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return DbManager;
}());
exports["default"] = DbManager;
module.exports = DbManager;
