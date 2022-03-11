import { IInstrumentSkeleton } from "./IInstrumentSkeleton";
var getDbConnection = require('../db/dbconnect');

class FutureSkeleton implements IInstrumentSkeleton{
    static count : number = 0;
    id: number;
    side: string;
    investmentStrategySkeletonId: number;

    constructor(id:number, side:string, skeletonId:number){
        
        this.id = id;
        this.side = side;
        this.investmentStrategySkeletonId = skeletonId;
    }

    getId() : number {
        return this.id;
    } 
    
    async setId(){

        //var Db = new DbManager();
       // var result = Db.GetCountOfRecordsInDb("user");
       var sql = "Select  count(*) as count from FutureSkeleton";

       const connection = await getDbConnection();
       var response = await connection.query(sql) ; 
       connection.end()
        
        this.id = response[0].count + 1;
        //console.log(this.id);

    }
    
    async AddDataToDb(){

        if(this.id == -1){
            await this.setId();
        }
        

        
        var sql = "INSERT INTO FutureSkeleton (Id, Side, InvestmentStrategySkeletonId) VALUES (?,?,?)";
       

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id, this.side, this.investmentStrategySkeletonId]) ; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
       
}