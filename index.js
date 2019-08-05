const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");


const app = express();




app.set('view engine', 'pug');
app.set('views','./views');

app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());


//Require the Router we defined in hotDogs.js
let hotDogs = require('./hotDogs.js');

//Use the Router on the sub route /hotDogs
app.use('/hotDogs', hotDogs);

app.get('/menu', (req, res) => {
    res.render('menu');
});



let port = process.env.PORT || 3000;
app.listen(port,  () => {
    console.log('Listening to port:  ' + 3000);
});