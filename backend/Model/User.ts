
var getDbConnection = require('../db/dbconnect');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var DbManager = require('./DbManager');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'abrakadabra';


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

        const authtoken = jwt.sign({_id : this.id}, JWT_SECRET);


        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id , this.name , this.email , secPass] ) ; //,  function (err, result) {
            connection.end()
            
            response.authtoken = authtoken;
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

        const authtoken = jwt.sign({_id : result.id}, JWT_SECRET);
        result.authtoken = authtoken
        console.log(result);
        return result;

    }
}

 module.exports = User