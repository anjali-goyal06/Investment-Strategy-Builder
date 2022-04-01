
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var DbManager = require('./DbManager');

export default class User{
    static count : number = 0;
    id : number;
    name : string;
    email : string;
    password : string;

    constructor(id:number, name: string , email : string , password : string){

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async setId(){

        try{
            const DbManager_ = await new DbManager();
            var response = await DbManager_.GetCountOfRecordsInDb('user');
        
            var current_count = response[0].count;
            this.id = current_count + 1;
        }catch(err){
            console.log(err);
        }
    }

    async AddUser(){

        if(this.id == -1){
            await this.setId();
        }
          
        var sql = "INSERT INTO user (id,name,email,password) VALUES (?,?,?,?)";
        //this.id = Math.floor(Math.random() * (10000000));
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
        var result = await connection.query(sql) ; 
        connection.end()

        var cnt = Object.keys(result).length;  
        if(cnt==0 || cnt>1){ 
            return { error: "Please try to login with correct credentials" };
        }

        // password matching 
        const passwordCompare = await bcrypt.compare(this.password, result[0].password);
        if (!passwordCompare) {
            return { error: "Please try to login with correct credentials" };
        }
        console.log(passwordCompare)
        console.log(result);
        return result;

    }
}

 module.exports = User