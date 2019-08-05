const express = require('express');
const router = express.Router();
const fs = require('fs');


const stat = fs.statSync('./hotDogs.json');

let data;
let hotDogs;

if(stat.size != 0){
     data = fs.readFileSync('./hotDogs.json');
     hotDogs = JSON.parse(data);
}
else{
    hotDogs = [];
}



router.get('/', (req ,res ) => {

    res.json({AllHotDogs: hotDogs, messsage: "Go to the path localhost:3000/menu to navigate"});
    
});

router.get('/:id([0-9]{1,})', (req, res) => {
    let currHotDog = hotDogs.find(hotDog => hotDog.id == req.params.id);
   
    if(currHotDog){
        res.json({FindedHotDog: currHotDog, messsage: "Go to the path localhost:3000/menu to navigate"}); 
        
    }else{
        res.status(404);
        res.json({messsage: "Not Found, go to the path localhost:3000/menu to navigate"});
    }
});


router.get('/create', (req, res) => {
    res.render('CreateHotDog');
})


router.post('/create', (req, res) => {
    if(!req.body.name ||
        !req.body.size ||
        !req.body.typeOfSausage ){
        console.log(req.body);
        res.status(400);
        res.json({message: "Bad Request, go to the path localhost:3000/menu to navigate"});
      
     } else {
        let newId = (hotDogs[hotDogs.length-1] == undefined) ? 1: (hotDogs[hotDogs.length-1].id + 1);

        let newMustard = (req.body.mustard != undefined) ? true : false;

        hotDogs.push({
           id: newId,
           name: req.body.name,
           size: req.body.size,
           typeOfSausage: req.body.typeOfSausage,
           mustard: newMustard,
        });
        res.json({message: "New hotDog created.", location: `localhost:3000/HotDog/${newId}, or go to the path localhost:3000/menu to navigate`});

        let newData = JSON.stringify(hotDogs);
        fs.writeFileSync('./hotDogs.json', newData);
     }
});


router.get('/update', (req, res) => {
    res.render('UpdateHotDog');
});


router.post('/update', (req ,res) => {
    let updateIndex = hotDogs.findIndex(hotDog => hotDog.id == req.body.id);
  
    if(updateIndex == -1){
        res.status(404);
        res.json({messsage: "Not Found, go to the path localhost:3000/menu to navigate"});
    }else{

        let newMustard = (req.body.mustard != undefined) ? true : false;

         hotDogs[updateIndex] = {

            name: req.body.name,
            size: req.body.size,
            typeOfSausage: req.body.typeOfSausage,
            mustard: newMustard,
            id: req.body.id
         };
        
       
        res.json({message: "HotDog updated!", location: `localhost:3000/HotDog/${req.body.id}, or go to the path localhost:3000/menu to navigate`});

        let newData = JSON.stringify(hotDogs);
        fs.writeFileSync('./hotDogs.json', newData);
    }
});

//

router.get('/delete', (req, res) => {
    res.render('DeleteHotDog');
});


router.post('/delete', (req ,res) => {
    let deleteIndex = hotDogs.findIndex(hotDog => hotDog.id == req.body.id);

    if(deleteIndex == -1){
        res.status(404);
        res.json({messsage: "Not Found, go to the path localhost:3000/menu to navigate"});
    }else{
         hotDogs.splice(deleteIndex, 1);

        
       
        res.json({message: `Hotdog with id ${req.body.id} removed, go to the path localhost:3000/menu to navigate`});

        let newData = JSON.stringify(hotDogs);
        fs.writeFileSync('./hotDogs.json', newData);
    }
});






module.exports = router;