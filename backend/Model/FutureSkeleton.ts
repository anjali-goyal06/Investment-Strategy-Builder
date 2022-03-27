var getDbConnection = require('../db/dbconnect');

import IInstrumentSkeleton from './IInstrumentSkeleton';
import InstrumentSkeleton from './InstrumentSkeleton';

export default class FututreSkeleton extends InstrumentSkeleton{
    //id: number;
    //side: string;
    investmentStrategySkeletonId: number;

    constructor(id:number, side:string, skeletonId:number){
        super();
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
    
    async AddDataToDb(StrategySkeletonId:number){

        if(this.id == -1){
            await this.setId();
        }
        

        
        var sql = "INSERT INTO FutureSkeleton (Id, Side, InvestmentStrategySkeletonId) VALUES (?,?,?)";
       

        try{
            const connection = await getDbConnection()
            var response = await connection.query(sql, [this.id, this.side, StrategySkeletonId]) ; 
            connection.end()

            return response;
        }catch(err){
            console.log(err);
            return err;
        }
    }
       
}

module.exports = FututreSkeleton;