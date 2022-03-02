var connection = require('../db/dbconnect');

class UserRepository{
    
    constructor(user){
        this.user = user
    }

    async AddUser(){
        console.log("values..........");
        console.log(this.user);
        
        var sql = "INSERT INTO user (id,name,email,password) VALUES (?,?,?,?)";
        var {id,name,email,secPass} = this.user

        try{
        var response = await connection.query(sql, [id , name , email , secPass] ) ; //,  function (err, result) {
          
        var arr = response.values; 
        console.log(arr[1]); 
        return response.values;
        }catch(err){
            console.log(err);
            return err;
        }

        //     if (err){ 
        //       console.log("duplicate rows " + err.message);
        //       return err.message;
        //     }
        //     else{
        //         console.log("user created successfully !!");
        //         console.log(result);
        //         return  result;
        //     }
        // });
        
    }

    GetUserByEmailId(){
        var sql = "Select  * from user where email = " + mysql.escape(email);

        connection.query(sql, async function (err, result) {
            if (err) console.log(err.message);
            else{

                // find noumber of results get
                var cnt = Object.keys(result).length; 
                
                
                if(cnt==0){ 
                    return res.status(400).json({ success, error: "Please try to login with correct credentials" });
                }
                
                // password matching 
                const passwordCompare = await bcrypt.compare(password, result[0].password);
                if (!passwordCompare) {
                    success = false
                    return res.status(400).json({ success, error: "Please try to login with correct credentials" });
                }
                console.log(result);
                return res.send(result);
            }
            });
    }


}

module.exports = UserRepository