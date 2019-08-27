module.exports = {
    'connection':{
     'host':'localhost',
     'user':'root',
     'password':'root',
    },
    'database':'server',
    'user_table':'customer',
    'user_table':'artist'
   }

    /*
function getConnection()
{
    return mysql.createConnection({
        host:'localhost',
        user :'root',
        password : 'root',
        database :'server',
        //insecureAuth : true
        multipleStatements: true
    });
}

var mysqlConnection= getConnection();

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log('connection successful');
        
    }
    else
    { 
        console.log('connection failed: '+JSON.stringify(err));
    }
});

}

*/