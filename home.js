const express = require('express');

const router = express.Router();

const request = require('request')

const app = require('./app')

 

//const subscribed = []

 

router.post('/search',(req,res)=>{

    console.log(req.body)

   

    request({

        uri:'http://localhost:3000/rest/search/'+req.body.location,

        // qs: {

        //   }

    }).pipe(res)

    // //res.send(ngo)

    // const result=app.rest.filter(obj=>req.body.location===obj.location)

    // //res.send(req.params.id)

    // console.log(result)

    // res.send(result)

})

router.get('/add/:ngoId/:restId',(req,res)=>{

    const tempRest = app.rest.find(obj=>obj.id==req.params.restId);

    console.log(tempRest)

    const tempNgo  = app.ngo.find(obj=>obj.id==req.params.ngoId)

  

    tempNgo.restSub.push(tempRest.id);

    console.log(tempNgo)

    //res.send(subscribed)

    tempRest.ngoSub.push(tempNgo.id);

    console.log(tempRest)

    res.send("Subscribed successfully")

})

 

router.get('/',(req,res)=>{

    console.log(app.ngo);

    res.send(app)

    console.log(app.rest);

    //res.send(ngo)

})

router.post('/notify',(req,res)=>{

    console.log(req.body)

    //console.log(req.params.arr)

})

 

module.exports = router;