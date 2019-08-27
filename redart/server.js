const mysql= require('mysql');
const express=require('express');
const session=require('express-session');
const morgan=require('morgan');
const passport=require('passport');
const path =require('path');


const cookieParser = require('cookie-parser');
const flash=require('connect-flash');
const LocalStrategy = require('passport-local').Strategy; 

const expressvalidator=require('express-validator'); 

//require('./passport')(passport)

const TWO_HOURS= 1000 * 60 * 60 * 2
var app=express();
var router=express.Router();

const { 
    PORT = 3000,
    SESS_NAME='sid',
    SESS_SECRET='ssshhhh',
    NODE_ENV = 'development',
    SESS_LIFETIME= TWO_HOURS

} = process.env


const IN_PROD =NODE_ENV === 'production' 

require('./config/passport')(passport);

const bodyparser=require('body-parser');
app.use(express.static('./default'))
app.use(cookieParser());

app.use(morgan('dev'));
//for user login
//var authenticateController=require('./user');

//code used to receive decent data.
app.set('view engine', 'ejs');

//app.engine('html', require('ejs').renderFile);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))

app.use(session({ 
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie : {
        maxAge: SESS_LIFETIME,
        sameSite: true, 
        secure: IN_PROD

    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


require('./app/routes.js')(app, passport);

app.listen(PORT,()=> console.log("server 3000 port is running . . .")); 


