var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);



module.exports= (app, passport) => {

    //app.set('default', __dirname + '/default');

     app.get('/', (req, res) => {
         res.redirect('indexmain.html');

     });

    app.get('/cust_login', function(req, res){
        res.redirect('/web/index.html')
        //res.render('/web/index.html', {message:req.flash('loginMessage')});
       });

       app.post('/cust_login', passport.authenticate('local-login', {
        successRedirect: '/index-1',
        failureRedirect: '/cust_login',
        failureFlash: true
       }),

       function(req, res){
        if(req.body.remember){
         req.session.cookie.maxAge = 1000 * 60 * 3;
        }else{
         req.session.cookie.expires = false;
        }
        res.redirect('/');
       });

       app.get('/seller_login', (req, res) => {

        res.redirect('web/seller.html');

       })

       app.post('/seller_login', passport.authenticate('local-sellerlogin', {
           successRedirect: '/seller',
           failureRedirect: '/seller_login',
           failureFlash: true
       }),
        function(req, res){
            if(req.body.remember){
            req.session.cookie.maxAge = 1000 * 60 * 3;
            }else{
            req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

        app.get('/seller_login', (req, res) => {

            res.redirect('web/seller.html');

        }

       )

       app.get('/seller', isLoggedIn, (req, res) => {
           
           res.redirect('/artistmain.html');

       })

       app.get('/cust_create', function(req, res){
        //res.render('/web/Reg/web/index.html', {message: req.flash('signupMessage')});
        res.redirect('/web/Reg/web/index.html');

       });

       /*
       app.post('/cust_create', passport.authenticate('local-signup', {
        successRedirect: '/web/index.html',
        failureRedirect: '/cust_create',
        failureFlash: true
       }));
       */
      app.post('/cust_create', (req, res ) => {

        console.log('creating a customer det');

        //console.log(" the name is  "+req.body.first_name);
    
        var custid = req.body.cust_id;
        var fisrtname = req.body.first_name;
        var lastname = req.body.last_name;
        var email = req.body.email;
        var password = req.body.pswd;
        var gender = req.body.selector1;
        var phonenumber = req.body.phone_number;
        var address = req.body.address;
        var code = req.body.zip_code;
        var place = req.body.place;

        var newUserMysql = {
            email : email,
            password : bcrypt.hashSync(password, null, null)
        }
    
        var thequery = "INSERT INTO customer (c_namef, c_namel, c_email, password, c_gender, c_phoneno, c_address, zipcode, c_place) VALUES (?,?,?,?,?,?,?,?,?)";
    
        connection.query(thequery, [fisrtname, lastname, newUserMysql.email , newUserMysql.password , gender, phonenumber, address, code, place], (err, result, fields) => {
    
            if (!err) {
                console.log('Customer Data inserted ');
    
            } else {
                console.log('request failed ' + err);
                res.end();
    
            }
        });
    
        res.redirect('/web/index.html');
      })

      app.post('/artist_create', (req, res ) => {

            console.log('creating artist...');

        var fisrtname=req.body.first_name;
        var lastname=req.body.last_name;
        var email=req.body.email;
        var password=req.body.password;
        
        var phonenumber=req.body.phone_number;
        var address=req.body.address;
        
        var place=req.body.place;

        var newUserMysql = {
            email : email,
            password : bcrypt.hashSync(password, null, null)
        }

        var thequery="INSERT INTO artist (a_namef, a_namel, a_email, password, a_phoneno, a_address, a_place) VALUES (?,?,?,?,?,?,?)";

        connection.query(thequery,[fisrtname, lastname,newUserMysql.email, newUserMysql.password, phonenumber, address, place], (err, result,fields)=>
        {
            if(!err)        
            {
                console.log('Artis Data inserted ');

            }
            else
            {
                console.log('request failed '+err);
                res.end();

            }
            });

            res.redirect('/web/seller.html');
        })

       app.get('/index-1', isLoggedIn, (req, res) => {
        // res.render('index-1.html', {
        //   user:req.user
        //  });
        res.redirect('/custmain.html');
       });

       app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
       })
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();
   
    res.redirect('/');
   }