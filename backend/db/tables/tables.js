var getDbConnection =require('../dbconnect.js');


const tableCreation = async () =>{

    const userTable = "create table if not exists user(name varchar(50),id int(10) primary key, email varchar(50),password varchar(1000))";
    const OptionSkeletonTable = "CREATE TABLE if not exists OptionSkeleton (Id int PRIMARY KEY, Side varchar(15) NOT NULL, Type varchar(15) NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const FutureSkeletonTable = "CREATE TABLE if not exists FutureSkeleton (Id int PRIMARY KEY, Side varchar(15) NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const StockSkeletonTable = "CREATE TABLE if not exists StockSkeleton (Id int PRIMARY KEY, Side varchar(15) NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const InvestmentStrategySkeletonTable = "create table if not exists InvestmentStrategySkeleton(Id int PRIMARY KEY, StrategyName varchar(30) NOT NULL UNIQUE, Description varchar(5000), UserId int(50), FOREIGN KEY (UserId) REFERENCES user(Id))"; 
    const InvestmentStrategyTable = "create table if not exists InvestmentStrategy(Id int PRIMARY KEY, Name varchar(60) NOT NULL UNIQUE, StockName varchar(50) NOT NULL, Ticker varchar(50) NOT NULL, ExpiryDate date NOT NULL, userId int, Description varchar(5000), InvestmentStrategySkeletonId int, FOREIGN KEY (UserId) REFERENCES user(Id), FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const StockTable = "create table if not exists Stock(Id int PRIMARY KEY, Price double NOT NULL, Quantity int NOT NULL, StockSkeletonId int, InvestmentStrategyId int,  FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), FOREIGN KEY (StockSkeletonId) REFERENCES StockSkeleton(Id))";
    const FutureTable = "create table if not exists Future(Id int PRIMARY KEY, Price double NOT NULL, Quantity int NOT NULL, FutureSkeletonId int, InvestmentStrategyId int, FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), FOREIGN KEY (FutureSkeletonId) REFERENCES FutureSkeleton(Id))";
    const OptionsTable = "create table if not exists Options(Id int(50) PRIMARY KEY, StrikePrice double NOT NULL, Premium double NOT NULL, Quantity int NOT NULL, OptionSkeletonId int(50), InvestmentStrategyId int, FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), FOREIGN KEY (OptionSkeletonId) REFERENCES OptionSkeleton(Id))";
 
    const connection = await getDbConnection()
    await connection.query(userTable) ; 
    await connection.query(InvestmentStrategySkeletonTable) ; 
    await connection.query(FutureSkeletonTable);
    await connection.query(StockSkeletonTable);
    await connection.query(OptionSkeletonTable);
    await connection.query(InvestmentStrategySkeletonTable); 
    await connection.query(InvestmentStrategyTable); 
    await connection.query(StockTable);
    await connection.query(OptionsTable);
    await connection.query(FutureTable); 
    connection.end()
}

tableCreation()
// connection.query("" , (err,res)=>{
//     if(err){
//       console.log(err);
//     }else{
//       console.log(res);
//     }
// })

module.exports = tableCreation
















/*
 const userTable = "create table if not exists user(name varchar(50),id int(10) primary key, email varchar(50),password varchar(1000))";
    const OptionSkeletonTable = "create table if not exists OptionSkeleton ( Id int PRIMARY KEY, Side varchar(15) NOT NULL, Type varchar(15) NOT NULL, Quantity int NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const FutureSkeletonTable = "create table if not exists FutureSkeleton ( Id int PRIMARY KEY, Side varchar(15) NOT NULL, Quantity int NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const StockSkeletonTable = "CREATE TABLE if not exists StockSkeleton ( Id int PRIMARY KEY,  Side varchar(15) NOT NULL, Quantity int NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))"
    const InvestmentStrategySkeletonTable = "create table if not exists InvestmentStrategySkeleton( Id int PRIMARY KEY, StrategyName varchar(30) NOT NULL, Description varchar(100), UserId int(50), FOREIGN KEY (UserId) REFERENCES User(Id))"; 
    const InvestmentStrategyTable = "create table if not exists InvestmentStrategy(Id int PRIMARY KEY, Name varchar(60) NOT NULL UNIQUE, StockName varchar(50) NOT NULL, ExpiryDate date NOT NULL, UserId int, Description varchar(100), InvestmentStrategySkeletonId int, FOREIGN KEY (UserId) REFERENCES User(Id), FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const StockTable = "create table if not exists Stock(Id int PRIMARY KEY, Price double NOT NULL, Quantity int NOT NULL, StockSkeletonId int, InvestmentStrategyId int,  FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), FOREIGN KEY (StockSkeletonId) REFERENCES StockSkeleton(Id))";
    const FutureTable = "create table if not exists Future(Id int PRIMARY KEY, Price double NOT NULL, Quantity int NOT NULL, FutureSkeletonId int, InvestmentStrategyId int, FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), FOREIGN KEY (FutureSkeletonId) REFERENCES FutureSkeleton(Id))";
    const OptionsTable = "create table if not exists Options(Id int(50) PRIMARY KEY, StrikePrice double NOT NULL, Premium double NOT NULL, Quantity int NOT NULL, OptionSkeletonId int(50), InvestmentStrategyId int, FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), FOREIGN KEY (OptionSkeletonId) REFERENCES OptionSkeleton(Id))";
*/