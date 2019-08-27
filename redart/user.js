const express = require('express');
const router = express.Router();


router.get('/',(req,res,next) => {
    res.render('index.html', {title : "my app"});

})

//const mysql= require('mysql');

//user model
 
