var getDbConnection =require('./dbconnect.js');


const DatabaseCreation = async () =>{
  
    const connection = await getDbConnection()
    await connection.query("create database if not exists InvestmentStrategyBuilder") ; 
    await connection.query("use investmentstrategybuilder");
    connection.end()
}

DatabaseCreation()
module.exports = DatabaseCreation
