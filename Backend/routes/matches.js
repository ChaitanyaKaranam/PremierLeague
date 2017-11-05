const express=require('express');
const router = express.Router();
const PremierModel = require('../models/premier-model');
const cors=require('cors');


router.get('/',(req,res,next)=>{
    var season=req.query.season;
    var team=req.query.team;
    console.log(team);
    if(team===''){
      PremierModel.getMatchInfo({'season':season},(err,val)=>{
        res.json(val);
        res.end();
      });
    }
    else{
      PremierModel.getMatchInfo({'season':season,$or:[{'team1':team},{'team2':team}]},(err,val)=>{
        res.json(val);
        res.end();
      });
    }
        
});

module.exports=router;