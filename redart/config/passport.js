var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
 passport.serializeUser(function(user, done){
  done(null, user.userid);
  console.log(user.userid);
  
 });

 passport.deserializeUser(function(userid, done){
  connection.query("SELECT * FROM customer WHERE userid = ? ", [userid],
   function(err, rows){
    done(err, rows[0]);
   });
 });

 passport.deserializeUser(function(userid, done){
  connection.query("SELECT * FROM artist WHERE userid = ? ", [userid],
   function(err, rows){
    done(err, rows[0]);
   });
 });

 /*
 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, email, password, done){
   connection.query("SELECT * FROM customer WHERE c_email = ? ", 
   [email], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
        //custid = req.body.cust_id,
        fisrtname : req.body.first_name,
        lastname : req.body.last_name,
        
        gender : req.body.selector1,
        phonenumber : req.body.phone_number,
        address : req.body.address,
        code : req.body.zip_code,
        place : req.body.place, 
      email:email,
      password: bcrypt.hashSync(password, null, null)
     };

     var insertQuery = "INSERT INTO customer (c_namef, c_namel, c_email, password, c_gender, c_phoneno, c_address, zipcode, c_place) VALUES (?,?,?,?,?,?,?,?,?)";

     connection.query(insertQuery, [ newUserMysql.fisrtname , newUserMysql.lastname, newUserMysql.email,newUserMysql.password, newUserMysql.gender, newUserMysql.phonenumber , newUserMysql.address, newUserMysql.code , newUserMysql.place ], function(err, rows){
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );
 
 */
/*
 var insertQuery = "INSERT INTO customer (c_namef, c_namel, c_email, password, c_gender, c_phoneno, c_address, zipcode, c_place) VALUES (?,?,?,?,?,?,?,?,?)";

 connection.query(insertQuery, [fisrtname, lastname, newUserMysql.email,newUserMysql.password, gender, phonenumber, address, code, place], function(err, rows){
   newUserMysql.id = rows.insertId;
*/
 

passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, email, password, done){
   connection.query("SELECT * FROM customer WHERE c_email = ? ", [email],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));

    return done(null, rows[0]);
   });
  })
 );

 passport.use(
  'local-sellerlogin',
  new LocalStrategy({
   usernameField : 'email',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, email, password, done){
   connection.query("SELECT * FROM artist WHERE a_email = ? ", [email],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));

    return done(null, rows[0]);
   });
  })
 );
};
