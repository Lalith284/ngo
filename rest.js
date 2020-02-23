const express = require('express');

const router = express.Router();

const app = require('./app')

const request = require('request')

 

router.get('/search/:location',(req,res)=>{

    console.log(req.params.location)

    const result=rest.filter(obj=>req.params.location===obj.location)

    //res.send(req.params.id)

    console.log(result)

    res.send(result)

    

})

router.post('/notify/:id',(req,res)=>{

    

    const tempRest = app.rest.find(obj=>obj.id==req.params.id);

    // console.log(tempRest.ngoSub)

    const ngoTemp=tempRest.ngoSub

    request.post({

        uri:'http://localhost:3000/home/notify',

        body:ngoTemp,

        json:true

        // qs: {

        //   }

    }).pipe(res)

})

 

module.exports=router

 

 