
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

    /**
     * Purpose - Fetches current record count in user table and sets id of current record to current record count plus one.
     * Parameters - None
     * Return Value - None
     */
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

    /**
     * Purpose - Adds user record in user table
     * @returns sql query response in case of successful insertion. 
     */
    async AddUser(){

        if(this.id == -1){
            await this.setId();
        }
          
        var sql = "INSERT INTO user (id,name,email,password) VALUES (?,?,?,?)";
        //this.id = Math.floor(Math.random() * (10000000));

        //Password Encrypted before adding in db
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

    /**
     * Purpose - Fetches user record corresponding to given email
     * @returns User record as response
     */
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