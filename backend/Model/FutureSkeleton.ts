var getDbConnection = require('../db/dbconnect');

import IInstrumentSkeleton from './IInstrumentSkeleton';

export default class FututreSkeleton implements IInstrumentSkeleton{
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

       var sql = "Select  count(*) as count from FutureSkeleton";
        try{
            const connection = await getDbConnection();
            var response = await connection.query(sql) ; 
            connection.end()
                
            this.id = response[0].count + 1;
        }catch(err){
            console.log(err)
        }

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

module.exports = FututreSkeleton;