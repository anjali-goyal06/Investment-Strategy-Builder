/**
 * This file contains the API for making and returning plot of a praticular strategy whenever requested (with
 *  strategy data) at the make plot endpoint.
 */

const express = require('express');
const router = express.Router();
var getDbConnection = require('../db/dbconnect');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser')

const InvestmentStrategy = require('../model/InvestmentStrategy');
const InstrumentManager = require('../model/InstrumentManager')


/**
 * Making the plot for the investment strategy whose details are provided in the request body.
 * It also calculates the starting x coordinate for the combined plot.
 * @returns the combined plot, basically x & y coordinates of the plot as response
 */
router.post('/',async(req, res)=>{
 
  var response = await  makePlot(req.body)
    res.send(response);
  
  });


  router.post('/id' , async (req,res) =>{
    var id = (req.body.id) ? (req.body.id) : 2;
    var investmentStrategy1 = new InvestmentStrategy();
    var response = await investmentStrategy1.fetchDetailedStrategyImplementationFromDbForUser(id);
    var result =await makePlot(response);

    var r = {
      "values" : response,
      "coords" : result
    }
    return res.send(r)
  })
  
  const makePlot = async (data) => {
       //Creating investment strategy object
       var investmentStrategy = await new InvestmentStrategy(-1, data.StockName, data.Ticker, -1, data.ExpiryDate, data.Name, -1, data.Description);
       var instrumentManager = await new InstrumentManager();
       //console.log(data.instruments);
   
       let sum = 0;
       for(var i=0; i<data.listInstruments.length; i++){
         var instrument = data.listInstruments[i];
   
         if(instrument.segment.toLowerCase() == "option"){
         
          sum = sum + parseInt(instrument.StrikePrice);
          // console.log("strile = " + instrument.StrikePrice)
         }else{
          // if(!instrument.Price) instrument.Price = instrument.StrikePrice
         sum = sum + parseInt(instrument.Price);
          // console.log("strile = " + instrument.Price)
         }
     
         //creating appropriate instrument object using instrument manager and adding to investment strategy object
         var _instrument = await instrumentManager.createInstrument(instrument.segment, instrument.Quantity, instrument.StrikePrice, instrument.Price, instrument.Type, instrument.Side, instrument.Premium);
         //console.log(investmentStrategy.instruments)
         investmentStrategy.instruments.push(_instrument);
       }
   
       //var range = 100;
     
       //console.log(sum)
       let total = data.listInstruments.length;
       //console.log(total)
       let t = Math.floor(total);
     
      //setting the starting x coordinate of combined plot
       let average = Math.floor(sum/t);
   
       let range = 2*average;
       if(range > 400) range = 400;
   
   
       let startCoord = average - (range/2);
       //console.log(startCoord)
       startCoord = Math.floor(startCoord);
       range = Math.floor(range);
   
       if(startCoord<0) startCoord = 0;
       console.log("startcoords = " + startCoord);
       console.log("range = " + range);
   
       //Making the combined plot
       var plot = await investmentStrategy.combinedPlot(startCoord, range);
     
       var response = plot;
       console.log(response)
       return response
  }


  module.exports = router

  // ) 1651363200000 1648666418777