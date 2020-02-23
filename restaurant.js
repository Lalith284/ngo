const express = require('express');
const router=express.Router();
// const app=require('./app');
const request=require('request');

router.get('/search/:location/:food',(req,res)=>{
const r=req.params.location;
const f=req.params.food;

    request.get({
        uri:'http://localhost:3000/ngo/satiesfied/'+r+'/'+f,
        body:r,
        // json:true,
    }).pipe(res);
})

module.exports=router

