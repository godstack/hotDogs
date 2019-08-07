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
    let isEmpty = (hotDogs.length == 0) ? true : false;
    res.render('AllHotDogs', {results: hotDogs, isEmpty: isEmpty}); 
});

router.get('/find', (req, res) => {
    
    res.render('FindHotDog', {results: hotDogs}); 
});


router.post('/find', (req, res) => {
    if(!req.body.id){
        res.render('FindedHotDog', {results: hotDogs, find: req.body.id, go: false}); 
   
    }else{
        res.render('FindedHotDog', {results: hotDogs, find: req.body.id, go: true}); 
    }
});

router.get('/create', (req, res) => {
 
    res.render('CreateHotDog', {go: true, done: false});
})


router.post('/create', (req, res) => {
    if(!req.body.name ||
        !req.body.size ||
        !req.body.typeOfSausage ){
        
        
    
        res.render('CreateHotDog', {go: false, done: false});
      
     } else {
        let newId = (hotDogs[hotDogs.length-1] == undefined) ? 1: (Number(hotDogs[hotDogs.length-1].id) + 1);
        
        let newMustard = (req.body.mustard != undefined) ? true : false;

        hotDogs.push({
           name: req.body.name,
           size: req.body.size,
           typeOfSausage: req.body.typeOfSausage,
           mustard: newMustard,
           id: newId
        });
 
        res.render('CreateHotDog', {go: false, done: true});
        

        let newData = JSON.stringify(hotDogs);
        fs.writeFileSync('./hotDogs.json', newData);
     }
});


router.get('/update', (req, res) => {
    res.render('UpdateHotDog', {go: true, done: false});
});


router.post('/update', (req ,res) => {
    let updateIndex = hotDogs.findIndex(hotDog => hotDog.id == req.body.id);
  
    if(updateIndex == -1){
        
        res.render('UpdateHotDog', {go: false, done: false});
    }else{

        let newMustard = (req.body.mustard != undefined) ? true : false;

         hotDogs[updateIndex] = {

            name: req.body.name,
            size: req.body.size,
            typeOfSausage: req.body.typeOfSausage,
            mustard: newMustard,
            id: req.body.id
         };
        
       
         res.render('UpdateHotDog', {go: false, done: true});

        let newData = JSON.stringify(hotDogs);
        fs.writeFileSync('./hotDogs.json', newData);
    }
});

//

router.get('/delete', (req, res) => {
    res.render('DeleteHotDog', {done: false, go: true});
});


router.post('/delete', (req ,res) => {
    let deleteIndex = hotDogs.findIndex(hotDog => hotDog.id == req.body.id);

    if(deleteIndex == -1){
        
        res.render('DeleteHotDog', {done: true, go: false});
    }else{
         hotDogs.splice(deleteIndex, 1);

        
       
         res.render('DeleteHotDog', {done: false, go: false});

        let newData = JSON.stringify(hotDogs);
        fs.writeFileSync('./hotDogs.json', newData);
    }
});






module.exports = router;