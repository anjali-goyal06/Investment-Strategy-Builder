var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');

class User{
    
    constructor(user){
        this.user = user
    }

    async AddUser(){
        console.log(this.user);
        
        var sql = "INSERT INTO user (id,name,email,password) VALUES (?,?,?,?)";
        var {id,name,email,secPass} = this.user

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [id , name , email , secPass] ) ; //,  function (err, result) {
            connection.end()

        return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async GetUserByemailId(){
        var sql = "Select  * from user where email = " + mysql.escape(this.user.email);

        const connection = await getDbConnection()
        var response = await connection.query(sql) ; 
        connection.end()
        console.log(response)
        return response;
    }


}

module.exports = User

