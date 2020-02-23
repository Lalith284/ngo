const express = require('express');
const router = express.Router();
const app = require('./app');
let filteredNgo;





router.get('/satiesfied/:location/:food', (req, res) => {
    // console.log(app.pending)
    let location = req.params.location;
    let food = req.params.food;
    allocate(location, food, (totalNgo, food) => {
   
        sendNotification(totalNgo, food, (checkNgo, remainingFood) => {

            processedNgo(checkNgo, remainingFood, () => {

                res.status("done");
            })
        })

    });

})

function allocate(location, food, callback) {

    filteredNgo = app.ngos.filter(obj => location == obj.location && obj.people <= food);
    // console.log(filteredNgo);

    for (var i = 0; i < filteredNgo.length; i++) {
        for (var j = i + 1; j < filteredNgo.length; j++) {
            if (filteredNgo[i].people < filteredNgo[j].people) {
                const t = filteredNgo[i];
                filteredNgo[i] = filteredNgo[j];
                filteredNgo[j] = t;
            }
        }
    }
    callback(filteredNgo, food);
}


function sendNotification(totalNgo, food, callback) {
    var sum = 0;
    var remaining = 0;
    for (var i = 0; i < totalNgo.length; i++) {
        sum = sum + (totalNgo[i].people);
        remaining = food - sum;
        if (sum <= food) {
            var temp = {
                restId: 1,
                ngoId: totalNgo[i].id
            }
            app.pending.push(temp);
        }
    }
    callback(totalNgo, remaining)

}


function processedNgo(totalNgo, remainingFood) {
    setTimeout(() => {
        let flag = 0;
        // console.log(totalNgo)
        for (var i = 0; i < app.pending.length; i++) {
            
            // console.log(app.pending[i].restId)
            
            if (app.pending[i].restId == 1) {

                // console.log(app.pending[i].ngoId)

                flag = 1;
                remainingFood = remainingFood + app.ngos[(app.pending[i].ngoId)-1].people;
                for (var j = 0; j < totalNgo.length; j++) {
                    
                    if (totalNgo[j].id == app.pending[i].ngoId) {
                      
                      
                        totalNgo.splice(j, 1);
                       
                        
                    }

                }
            }

        }

         console.log(totalNgo)
        if (flag == 1) {
           
        }
        else {
            return ("done")
        }

    }, 1000)


}












// setTimeout(()=>{
//     var foodie=0;
//     let c=0;
//     for(var k=0;k<app.pending.length;k++){
//         if(app.pending[k].restId==1){
//             c++;
//           let q=app.pending[k].ngoId
//             // console.log(q);
//             // console.log(app.ngos[q-1].people);
//          foodie=foodie+app.ngos[q-1].people;
//          filteredNgo.pop(app.ngos[q-1].people);    
//         }
//     }
//      console.log(foodie);
//      if(c==0){
//          return;
//      }
//      else{

//          allocate(chennai,foodie)
//      }
// },1000)

module.exports = router;