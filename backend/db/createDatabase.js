var getDbConnection =require('./dbconnect.js');


const DatabaseCreation = async () =>{
  
    try{
        const connection = await getDbConnection()
        await connection.query("create database if not exists InvestmentStrategyBuilder") ; 
        //await connection.query("use investmentstrategybuilder");
        connection.end()
    }catch(err){
        console.log("err in connecting db")
    }
}

//DatabaseCreation()
module.exports = DatabaseCreation
