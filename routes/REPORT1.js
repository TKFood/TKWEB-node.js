var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  //res.render('REPORT1', { title: 'REPORT1' });
  var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'dsc',
        server: '192.168.1.105', 
        database: 'TKWEB' ,
        options: { encrypt: false }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        var SQL="SELECT [ID] AS AID FROM [TKWEB].[dbo].[LOGIN] WHERE [ID] ='1' ";

        request.query(SQL, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            //console.dir(recordset);
            
        
            
        });



    });
});






module.exports = router;