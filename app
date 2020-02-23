const express=require('express')

const app=express();

const restaurant=require('./restaurant')

const ngo=require('./ngo')

 

const ngos = [

{

        id:1,

        name:'abc',

        location:'Chennai',

        people:20,

    },

     {

        id:2,

        name:'def',

        location:'Chennai',

        people:50,

    },

     {

        id:3,

        name:'def',

        location:'Chennai',

      people:10,

    }

]

 

const rest = [

    {

        id:1,

        name:'xyz',

        location:'Chennai',

        

    },

    {

        id:2,

        name:'uvw',

        location:'Chennai',

     

    },

    {

        id:3,

        name:'uvw',

        location:'Bangalore',

     }
]
var pending=[]

app.use(express.json())

app.use('/ngo',ngo)

 app.use('/restaurant',restaurant)

//console.log(ngo)

 

app.listen(3000,()=>console.log('Listening'))

 

module.exports.ngos = ngos

module.exports.rest = rest
module.exports.pending = pending

