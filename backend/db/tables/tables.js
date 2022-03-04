var getDbConnection =require('../dbconnect.js');


const tableCreation = async () =>{

    const userTable = "create table if not exists user(name varchar(50),id int(10) primary key, email varchar(50),password varchar(1000))";
    const OptionSkeletonTable = "create table if not exists OptionSkeleton ( Id int PRIMARY KEY, Side varchar(15) NOT NULL, Type varchar(15) NOT NULL, Quantity int NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const FutureSkeletonTable = "create table if not exists FutureSkeleton ( Id int PRIMARY KEY, Side varchar(15) NOT NULL, Quantity int NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))";
    const StockSkeletonTable = "CREATE TABLE if not exists StockSkeleton ( Id int PRIMARY KEY,  Side varchar(15) NOT NULL, Quantity int NOT NULL, InvestmentStrategySkeletonId int, FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id))"
    const InvestmentStrategyTable = "create table if not exists InvestmentStrategySkeleton( Id int PRIMARY KEY, Strategy_name varchar(30) NOT NULL, Description varchar(100), UserId int(50), FOREIGN KEY (UserId) REFERENCES User(Id))"; 
  
    const connection = await getDbConnection()
    await connection.query(userTable) ; 
    await connection.query(InvestmentStrategyTable) ; 
    await connection.query(FutureSkeletonTable);
    await connection.query(StockSkeletonTable);
    await connection.query(OptionSkeletonTable) ; 
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