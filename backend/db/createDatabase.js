var getDbConnection =require('./dbconnect.js');


const DatabaseCreation = async () =>{
  
    const connection = await getDbConnection()
    await connection.query("create database if not exists InvestmentStretegyBuilder") ; 
    await connection.query("use investmentstretegybuilder");
    connection.end()
}

DatabaseCreation()
module.exports = DatabaseCreation
