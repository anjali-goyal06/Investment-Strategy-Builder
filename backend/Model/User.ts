var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

class User{
    id : number;
    name : string;
    email : string;
    password : string;

    constructor(name: string , email : string , password : string){
        this.name = name;
        this.email = email;
        this.password = password
    }

    async AddUser(){
          
        var sql = "INSERT INTO user (id,name,email,password) VALUES (?,?,?,?)";
        //this.id = Math.floor(Math.random() * (10000000));
        this.id=1;
        const salt = await bcrypt.genSalt(10);
        var secPass = await bcrypt.hash(this.password, salt);

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id , this.name , this.email , secPass] ) ; //,  function (err, result) {
            connection.end()

        return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }

    async LoginUser(){
        var sql = "Select  * from user where email = " + mysql.escape(this.email);

        const connection = await getDbConnection()
        var response = await connection.query(sql) ; 
        connection.end()
        console.log(response)
        return response;
    }
}

module.exports = User